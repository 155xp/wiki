---
visibility: public
title: "Calc Quiz: Chain Rule, Implicit, Inverses"
description: A no-calculator study page for the AP Calculus AB quiz on the chain rule, implicit differentiation and derivatives of inverse functions (sections 3.1 to 3.3).
updated: 2026-11-02
infobox:
  title: Quiz cheat sheet
  Quiz: Thursday, November 5, 2026. No calculator.
  Covers: Chain rule, implicit differentiation, derivatives of inverse functions
  Chain rule: "$\\frac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$"
  Implicit: "Every $y$ term picks up a factor of $\\frac{dy}{dx}$"
  Inverse: "$(f^{-1})'(a) = \\frac{1}{f'(f^{-1}(a))}$"
  Not on this quiz: Inverse trig derivatives, implicit second derivatives
---

Thursday's quiz covers the **chain rule**, **implicit differentiation** and **derivatives of inverse functions**. They are really one idea used three ways, so if you get the chain rule, the other two follow. By the end of this page, you will be able to take the derivative of a layered function, find a slope on a curve that is not solved for $y$, and find the slope of an inverse without ever writing the inverse down.

Our running example is the circle $x^2 + y^2 = 25$ and its point $(3, 4)$. We'll meet its top half in the chain rule section, the whole circle in the implicit section, and its mirror image in the inverse section, and all three times the slope will come out of the same idea.

In this article, we will (1) see why the chain rule multiplies rates and practice it on layers and tables, (2) use it to differentiate equations where $y$ is hidden, (3) use it once more to find slopes of inverse functions, and (4) collect the main ideas in a summary before a practice quiz with an answer key.

## Chain rule

In this section, we will see what the chain rule does, how to spot when you need it, and how to use it on formulas and tables.

### What is going on

Some functions come in layers. To work out $\sin(x^2)$, you square $x$ first, then take the sine. The ==outside== layer is the last step you would do on a calculator. The ++inside++ is whatever that step is applied to.

When $x$ changes a little, the inside changes, and then the outside reacts to that change. So the total rate of change is the outside's rate times the inside's rate. It works like gears. If gear A turns B twice as fast, and B turns C three times as fast, then C turns six times as fast as A. See [[Chain rule]] for more.

Let's try this on our running example. The top half of the circle is $y = \sqrt{25 - x^2}$. The ==outside== is the square root, and the ++inside++ is $25 - x^2$. At $x = 3$, the inside is 16, so the outside's rate there is $\dfrac{1}{2\sqrt{16}} = \dfrac{1}{8}$. The inside's rate is $-2x = -6$. Multiplying the two gives $\dfrac{1}{8}\cdot(-6) = -\dfrac{3}{4}$. As we can see, the circle falls 3 units for every 4 units it moves right at the point $(3, 4)$.

### How to spot it

Next, let's see how to tell when a problem needs the chain rule. You need it when the input to a function is anything other than plain $x$: parentheses raised to a power, a square root of something, something in an exponent, or something inside sin, cos or ln.

Watch where a power sits. $\sin^3(2x)$ means $\big[\sin(2x)\big]^3$, so the cube is the outermost layer.

::: note The move
Take the derivative of the ==outside== and leave the ++inside++ alone. Then multiply by the derivative of the ++inside++. You get one factor per layer.

$$\frac{d}{dx}\,\color{orange}{f(}\color{teal}{g(x)}\color{orange}{)} = \color{orange}{f'(}\color{teal}{g(x)}\color{orange}{)}\cdot\color{teal}{g'(x)}$$
:::

### Worked examples

Now let's apply the move to two problems: one from a formula and one from a table.

**Example 1.** Find $y'$ for $y = \sin^3(2x)$. Here $y'$ is short for $\dfrac{dy}{dx}$, the derivative of $y$.

1. **Name the layers.** From the outside in, they are cubing, then sine, then $2x$.
2. **Cube layer.** Bring down the 3, drop the power by one, and leave the inside alone: $3\sin^2(2x)$.
3. **Sine layer.** The derivative of sine is cosine, with $2x$ still inside: $\cos(2x)$.
4. **Last layer.** The derivative of $2x$ is 2.
5. **Multiply**, because rates in a chain multiply: $y' = 6\sin^2(2x)\cos(2x)$.

**Example 2.** Tables are a quiz favorite. Let $h(x) = f(g(x))$. Find $h'(1)$.

| $x$ | $f(x)$ | $f'(x)$ | $g(x)$ | $g'(x)$ |
|---|---|---|---|---|
| 1 | 3 | $-2$ | 2 | 5 |
| 2 | 4 | 7 | 1 | $-3$ |

1. **Write the rule first.** $h'(1) = f'(g(1))\cdot g'(1)$. This line earns credit by itself.
2. **Inside first.** You need to know what the inside hands the outside. The table says $g(1) = 2$.
3. **Outside slope at that value.** The outside's input is 2, so use $f'(2) = 7$, not $f'(1)$.
4. **Inside slope.** $g'(1) = 5$.
5. **Multiply.** $h'(1) = 7\cdot 5 = 35$.

Note that the 2 we read from the $g$ column decided which row of $f'$ we used. The second trap below skips exactly this step.

### Traps

Each trap below shows a wrong answer next to the right one. Each one skips or changes a single piece of the move.

:::: compare Forgetting the inside derivative
::: wrong
$\dfrac{d}{dx}\sin(5x) = \cos(5x)$
:::
::: right
The inside $5x$ adds a factor of 5: $5\cos(5x)$
:::
::::

:::: compare Feeding the outside the wrong number
::: wrong
In Example 2, $f'(1)\cdot g'(1) = -10$. Quizzes list this as a wrong choice on purpose.
:::
::: right
The outside gets the inside's value: $f'(2)\cdot g'(1) = 35$
:::
::::

:::: compare Stopping one layer early
::: wrong
$\dfrac{d}{dx}\sin^3(2x) = 3\sin^2(2x)\cos(2x)$
:::
::: right
The $2x$ layer still owes a factor of 2: $6\sin^2(2x)\cos(2x)$
:::
::::

Now that we can peel layers off a function of $x$, next we'll use the same move on equations where $y$ itself is the inside.

## Implicit differentiation

In this section, we will use the chain rule on equations that mix $x$ and $y$, starting with the full version of our running circle.

### What is going on

A circle like $x^2 + y^2 = 25$ is not written as "$y =$ something," but it still has a slope at every point. The trick is to treat $y$ as a function of $x$ that you just cannot see.

Then $y^2$ has layers. The square is the outside, and $y$ is the inside. The chain rule says to multiply by the inside's derivative, which is $\dfrac{dy}{dx}$. So every time we take the derivative of a $y$ term, a $\dfrac{dy}{dx}$ tags along. The same happens with $\sin y$ or $e^y$: sine or $e$ is the outside, and $y$ is the inside.

### How to spot it

Next, let's see when a problem calls for this. The signs are that $x$ and $y$ are mixed together in one equation. You are asked for $\dfrac{dy}{dx}$, a tangent line at a point, or where the tangent is horizontal or vertical.

::: note The move
Take the derivative of both sides. Attach $\dfrac{dy}{dx}$ to every $y$ term, and use the product rule on terms like $xy$. Then gather the $\dfrac{dy}{dx}$ terms on one side, factor it out, and divide.
:::

The answer is usually a fraction. When the top is zero, the slope is flat, so the tangent is horizontal. When the bottom is zero, the slope blows up, so the tangent is vertical. A condition like "$x = 0$" describes a line, so plug it back into the curve to get the actual points.

### Worked examples

Let's work through two examples: the running circle, then a curve with an $xy$ term.

**Example 3.** For the circle $x^2 + y^2 = 25$, find the tangent line at $(3, 4)$, and find where the tangent is horizontal.

1. **Take the derivative of both sides.** $x^2$ gives $2x$. $y^2$ gives $2y$ plus its tag-along. The 25 is a constant, so it gives 0: $2x + 2y\dfrac{dy}{dx} = 0$.
2. **Solve for the slope.** Move $2x$ over and divide by $2y$: $\dfrac{dy}{dx} = -\dfrac{x}{y}$.
3. **Plug in both coordinates**, since the slope depends on $x$ and $y$. At $(3, 4)$ it is $-\dfrac{3}{4}$, so the line is $y - 4 = -\dfrac{3}{4}(x - 3)$.
4. **Horizontal means the top is zero.** That happens when $x = 0$. Putting $x = 0$ into the circle gives the top and bottom points, $(0, 5)$ and $(0, -5)$.

The slope at $(3, 4)$ matches the $-\dfrac{3}{4}$ we got from the top half in the chain rule section. Implicit differentiation reached it without solving for $y$ first.

**Example 4.** Find the slope of $x^2 + xy + y^2 = 7$ at $(1, 2)$.

1. **Take the derivative of both sides.** $xy$ is a product, so it gives $y + x\dfrac{dy}{dx}$. The full line is $2x + y + x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$.
2. **Gather and factor.** Move the terms without $\dfrac{dy}{dx}$ to the other side: $\dfrac{dy}{dx}(x + 2y) = -(2x + y)$.
3. **Divide, then plug in both coordinates.** $\dfrac{dy}{dx} = -\dfrac{2x + y}{x + 2y} = -\dfrac{4}{5}$ at $(1, 2)$.

So at $(1, 2)$, this curve falls 4 units for every 5 units it moves right.

### Traps

As before, each trap pairs a wrong answer with the right one.

:::: compare The missing dy/dx, the number one lost point
::: wrong
$\dfrac{d}{dx}(y^2) = 2y$
:::
::: right
$y$ is the inside, so its derivative tags along: $2y\dfrac{dy}{dx}$
:::
::::

:::: compare Skipping the product rule on xy
::: wrong
$\dfrac{d}{dx}(xy) = \dfrac{dy}{dx}$
:::
::: right
Both factors change, so use the product rule: $y + x\dfrac{dy}{dx}$
:::
::::

:::: compare Stopping at the condition
::: wrong
"Horizontal when $y = -2x$." That is a whole line, not a point.
:::
::: right
Put $y = -2x$ back into the curve and solve for the points.
:::
::::

We have now used the chain rule on a hidden $y$. Next, we'll use it one last time to find the slope of a function we can only undo, not write down.

## Derivatives of inverse functions

In this section, we will see why the slope of an inverse is a reciprocal, and how to find it from a formula or a table.

### What is going on

An inverse undoes the original: if $f$ sends 1 to 4, then $f^{-1}$ sends 4 back to 1. Its graph is the original flipped across the line $y = x$, so every point $(b, a)$ becomes $(a, b)$.

The flip also swaps rise and run, so the slope turns into its reciprocal. The catch is that it has to be the slope **at the matching point**. You never need a formula for $f^{-1}$. You only need one point and one slope.

Our running example shows this. For $x$ between 0 and 5, the top half $f(x) = \sqrt{25 - x^2}$ sends 3 to 4, and we found its slope there is $-\dfrac{3}{4}$. Flipping across $y = x$ turns the point $(3, 4)$ into $(4, 3)$ and the slope into $-\dfrac{4}{3}$. In other words, $f^{-1}$ falls 4 units for every 3 units it moves right at $x = 4$.

### How to spot it

Next, let's see how these problems usually look. You see $f^{-1}$, $\left(f^{-1}\right)'(a)$, or "$g$ is the inverse of $f$." Usually $f$ is something you could never undo by hand, like $x^3 + 2x + 1$.

::: note The move
Flip the point, then flip the slope.

$$\left(f^{-1}\right)'(a) = \frac{1}{f'\big(\color{teal}{f^{-1}(a)}\big)}$$

To find the matching point, solve $f(x) = a$. Quizzes make this work by guessing, so try 0, 1, $-1$ and 2.
:::

### Worked examples

Let's do one example from a formula and one from a table.

**Example 5.** Let $f(x) = x^3 + 2x + 1$. Find $\left(f^{-1}\right)'(4)$.

1. **Find the matching point.** Which $x$ does $f$ send to 4? Try $x = 1$: $1 + 2 + 1 = 4$. So $f^{-1}(4) = 1$.
2. **Find the original slope there.** $f'(x) = 3x^2 + 2$, so $f'(1) = 5$.
3. **Flip it**, because the mirror swaps rise and run. The answer is $\dfrac{1}{5}$.

As we can see, we found the slope of $f^{-1}$ at 4 without ever undoing $x^3 + 2x + 1$.

**Example 6.** From a table. Find $\left(f^{-1}\right)'(5)$.

| $x$ | 1 | 2 | 3 | 5 |
|---|---|---|---|---|
| $f(x)$ | 2 | 5 | 7 | 9 |
| $f'(x)$ | 3 | 4 | 6 | 2 |

1. **Find 5 among the outputs**, in the $f(x)$ row. It sits under $x = 2$, so $f^{-1}(5) = 2$.
2. **Read the slope in that column.** $f'(2) = 4$.
3. **Flip it.** The answer is $\dfrac{1}{4}$.

Note that the 5 we started with was an output of $f$, so we looked for it in the $f(x)$ row, not the $x$ row.

### Traps

These two traps come from skipping one of the two flips.

:::: compare Plugging a straight into f prime
::: wrong
In Example 6, $\dfrac{1}{f'(5)} = \dfrac{1}{2}$, which used the $x = 5$ column.
:::
::: right
Find the matching point first, then flip: $\dfrac{1}{f'(2)} = \dfrac{1}{4}$
:::
::::

:::: compare Forgetting to flip
::: wrong
$\left(f^{-1}\right)'(4) = f'(1) = 5$
:::
::: right
The mirror swaps rise and run: $\dfrac{1}{f'(1)} = \dfrac{1}{5}$
:::
::::

We have now seen all three uses of the chain rule. Next, let's collect them in one place before the practice quiz.

## Summary

In this section, we restate each idea in one sentence, using our running circle where it helps.

::: takeaways
- **Chain rule:** The derivative is the outside's derivative with the inside left alone, times the inside's derivative, which gave $-\dfrac{3}{4}$ for the top half of the circle at $x = 3$; in a table, find the inside value first.
- **Implicit:** Because $y$ is a hidden inside, every $y$ term brings a $\dfrac{dy}{dx}$, and in the slope fraction a zero top means a horizontal tangent while a zero bottom means a vertical one.
- **Inverse:** To find the slope of an inverse, find the matching point on $f$ and then flip its slope, the way $-\dfrac{3}{4}$ at $(3, 4)$ became $-\dfrac{4}{3}$ at $(4, 3)$.
:::

Now that we have the three ideas in one place, let's test them on a practice quiz.

## Practice quiz

In this section, you'll try seven problems that mix all three ideas. No calculator. Use this table for problems 2 and 7.

| $x$ | $f(x)$ | $f'(x)$ | $g(x)$ | $g'(x)$ |
|---|---|---|---|---|
| 1 | 4 | $-1$ | 3 | 2 |
| 2 | 1 | 5 | 1 | $-3$ |

**1.** (Multiple choice) $\dfrac{d}{dx}\sin^2(3x) =$

- **A.** $2\sin(3x)\cos(3x)$
- **B.** $6\sin(3x)\cos(3x)$
- **C.** $6\sin(3x)$
- **D.** $6\cos(3x)$

**2.** (Multiple choice) If $h(x) = f(g(x))$, then $h'(2) =$

- **A.** $3$
- **B.** $-15$
- **C.** $-3$
- **D.** $5$

**3.** Find $\dfrac{dy}{dx}$ for $y = e^{\tan(4x)}$.

**4.** (Multiple choice) If $x^3 + y^3 = 6xy$, then $\dfrac{dy}{dx} =$

- **A.** $-x^2/y^2$
- **B.** $(x^2 - 2y)/(y^2 - 2x)$
- **C.** $(2y - x^2)/(y^2 - 2x)$
- **D.** $(2y - x^2)/y^2$

**5.** Find all points on $x^2 - xy + y^2 = 3$ where the tangent line is horizontal.

**6.** (Multiple choice) Let $f(x) = x^3 + x - 2$. Then $\left(f^{-1}\right)'(0) =$

- **A.** $1$
- **B.** $4$
- **C.** $1/13$
- **D.** $1/4$

**7.** Using the table, $g$ is invertible. Find $\left(g^{-1}\right)'(1)$.

When you have an answer for every problem, check your work in the answer key below.

## Answer key

Each answer is hidden until you open it, so try the problem first. Some answers also name the trap behind a wrong choice.

::: details 1. Answer
**Answer: B.** The square, the sine and the $3x$ each give a factor: $2\sin(3x)\cdot\cos(3x)\cdot 3$. Choice A forgot the 3.
:::

::: details 2. Answer
**Answer: A.** Inside first, $g(2) = 1$, so $h'(2) = f'(1)\cdot g'(2) = (-1)(-3) = 3$. Choice B is the trap of using $f'(2)$.
:::

::: details 3. Answer
**Answer:** $4\sec^2(4x)\,e^{\tan(4x)}$. The $e$ layer copies itself, tangent gives $\sec^2(4x)$, and the $4x$ gives a 4.
:::

::: details 4. Answer
**Answer: C.** Taking derivatives gives $3x^2 + 3y^2\dfrac{dy}{dx} = 6y + 6x\dfrac{dy}{dx}$, with the product rule on $6xy$. Solving for $\dfrac{dy}{dx}$ and dividing top and bottom by 3 gives C.
:::

::: details 5. Answer
**Answer:** $(1, 2)$ and $(-1, -2)$. The slope is $\dfrac{y - 2x}{2y - x}$, so the top is zero when $y = 2x$. Putting that into the curve gives $3x^2 = 3$.
:::

::: details 6. Answer
**Answer: D.** $f(1) = 0$, so the matching point is $x = 1$, and flipping $f'(1) = 4$ gives $\dfrac{1}{4}$. Choice A is the trap $\dfrac{1}{f'(0)}$.
:::

::: details 7. Answer
**Answer:** $-\dfrac{1}{3}$. The output 1 sits at $x = 2$ in the $g(x)$ column, so flip $g'(2) = -3$.
:::
