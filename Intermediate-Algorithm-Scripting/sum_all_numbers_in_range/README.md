# Sum All Numbers in a Range

Solution Explanation
=======================

One way to solve this challenge is by using the **Arithmetic Series** formula.
In mathematics, an arithmetic progression (AP) or arithmetic sequence is a sequence of numbers such that the difference between the consecutive terms is constant. For instance, the sequence 5, 7, 9, 11, 13, 15 … is an arithmetic progression with common difference of 2.

The sum of a finite arithmetic progression is called an **Arithmetic Series** and is defined as following:
<p align="center">
  <img src='arithmetic_series.gif'/>
</p>

Therefore, using our input (min, max) array, we only need to calculate the **Arithmetic Series** in order to compute all the numbers between min to max.
