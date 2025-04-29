---
title: "Byte Alignment Notes"
date: 2021-11-18T12:00:00+08:00
---

When dealing with raw memory directly, there might come the need to align your memory to the nearest of some power of 2.

<!--more-->

Typically you would want to do this when you are reading and writing to a data structure that uses raw bytes, like a memory arena that can contain different types for instance. Aligning values by their types minimizes cache trashing. This is because memory is typically read WORD by WORD. This means that 32-bit systems will read in 4 byte chunks and 64-bit systems will read 8 byte chunks.

For example, in 32-bit systems, memory is pulled into your CPU in blocks of 4 byte chunks (e.g. 0x00 to 0x03, 0x04 to 0x07, 0x08 to 0x0C). If you do not align your bytes properly, you might end up in a situation where you have to read more than necessary from memory to get a value out. To illustrate this, let's say we have a diagram like below that represents memory of a 32-bit system.

![blank_32_bit_memory](/img/blog/20211118/blank_32_bit_memory.jpg)

And an aligned 4-byte integer value would be packed something like this:

![blank_32_bit_memory](/img/blog/20211118/blank_32_bit_memory_aligned_int.jpg)

When retrieving an aligned 4-byte integer this way,  a 32-bit CPU only needs to do a single read on the 0x04 - 0x07 chunk (the red-dotted box represents 1 read ). However, a misaligned 4-byte integer might end up requiring more reads:

![blank_32_bit_memory](/img/blog/20211118/blank_32_bit_memory_unaligned_int.jpg)

In terms of efficiency, chances are we want to align our bytes, even if it costs slightly more memory. On top of that, there are also systems which flat out do not support reading of unaligned bytes, so there's that consideration for portability too. This is because it is much easier for the CPU to read aligned bytes than not, thus they might not support reading unaligned bytes.

So what bytes should we align our types to? To ensure that the CPU reads a type with the minimum amount of reads, we align them to a number that is divisible by their size. This means a 2 byte structure would align to a memory address that is a multiple of 2,  a 4 byte structure would align to a memory address that is a multiple of 4, so on and so forth. Notice that we only ever want to align to powers of 2.

How do we align?

First, let's get our inputs. Given a memory address A and the byte to align N where N is a power of 2, we can come up with some concrete examples:

- To align 0011 (3) to 4-byte, the result should be 0100 (4)
- To align 0110 (6) to 4-byte, the result should be 1000 (8)

To align, we need to remove the log2(N) least significant bits from A. This means that for 2 byte alignment, we want to remove ONLY the last bits and retain the rest of the bits.

- 2 byte alignment -> remove 1 least significant bits
- 4 byte alignment -> remove 2 least significant bits
- 8 byte alignment -> remove 3 least significant bits
- etc...

Some concrete examples:

- To align to 2 bytes (0010), we need to do `A & (1110)`
- To align to 4 bytes (0100), we need to do `A & (1100)`
- To align to 8 bytes (1000), we need to do `A & (1000)`
- etc...

Thus, the 'mask' to '&' against can be defined as `~(N-1)`, such that:

- To align to 2 bytes (0010), the mask is ~(0010 - 1) = ~0001 = 1110
- To align to 4 bytes (0100), the mask is ~(0100 - 1) = ~0011 = 1100
- To align to 8 bytes (1000), the mask is ~(1000 - 1) = ~0111 = 1000

And therefore, the formula for aligning a memory address backwards to an alignment value is: `A & ~(N-1)`

Aligning a memory address forward is straightforward; we simply add (N - 1) to the memory address before applying the formula above: `(A + (N-1)) & (~N-1)`

Below are functions for the formulas above in C:

```cpp
static inline void* 
AlignMemoryBackward(void* ptr, uint8_t align) {
    assert((align & (align - 1)) == 0); // power of 2 only
    return (void*)(umi(ptr) & ~(align - 1));
}

static inline void* 
AlignMemoryForward(void* ptr, uint8_t align) {
    assert((align & (align - 1)) == 0); // power of 2 only
    return (void*)((umi(ptr) + (align - 1)) & ~(align - 1));
}

```

As an additional note, it would be hasty (and I did this many times) to assume that it is okay to always align an object by its `alignof` value. That is, aligning characters by 1, aligning shorts by 2 and aligning longs by 4, etc. That would solve the issue of certain CPUs rejecting unaligned access, for sure. But if we are **really** concerned about cache hits/misses, we would want manually align them anyway. For example, if you want to take advantage of SIMD instructions, you might need to align all your data to 16 bytes anyway.

At the end of the day, what value we want to align to depends on the use case. 













