React 的核心思想是在内存中维护一颗虚拟 DOM 树，当数据变化时更新虚拟 DOM，得到一颗新dom树，
然后 Diff 新老虚拟 DOM 树，找到有变化的部分，得到一个 Change(Patch)，将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中。