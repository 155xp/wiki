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

This page gets you ready for the **quiz on sections 3.1 to 3.3**: the **chain rule**, **implicit differentiation**, and **derivatives of inverse functions**. It is no calculator, so every answer here works out by hand.

Each topic: the move, worked examples, traps. Practice quiz at the bottom.

You already know the power, product and quotient rules. This page does not re-teach them. It only shows where the three new ideas plug in.

## Derivatives you will plug in

These are the basic derivatives. In this unit, you use them as the "outside" piece of a chain.

| Function | Derivative | Function | Derivative |
|---|---|---|---|
| $x^n$ | $nx^{n-1}$ | $e^x$ | $e^x$ |
| $\sin x$ | $\cos x$ | $a^x$ | $a^x \ln a$ |
| $\cos x$ | $-\sin x$ | $\ln x$ | $\dfrac{1}{x}$ |
| $\tan x$ | $\sec^2 x$ | $\log_a x$ | $\dfrac{1}{x \ln a}$ |
| $\sec x$ | $\sec x \tan x$ | $\cot x$ | $-\csc^2 x$ |
| $\csc x$ | $-\csc x \cot x$ | | |

## Chain rule

Use it any time the input of a function is something other than plain $x$. For the full background, see [[Chain rule]].

### The chain rule move

::: note The move
Take the derivative of the ==outside==, leave the ++inside++ alone, then multiply by the derivative of the ++inside++.

$$\frac{d}{dx}\,\color{orange}{f(}\color{teal}{g(x)}\color{orange}{)} = \color{orange}{f'(}\color{teal}{g(x)}\color{orange}{)}\cdot\color{teal}{g'(x)}$$
:::

How to spot the inside: look for something in parentheses, under a root, up in an exponent, or inside sin, cos, ln and so on. If the inside has its own inside, keep going. **One factor per layer.**

Common outsides, ready to use:

| Shape | Derivative | Example |
|---|---|---|
| $e^{g(x)}$ | $e^{g(x)}\cdot g'(x)$ | $\dfrac{d}{dx}e^{x^2} = 2x\,e^{x^2}$ |
| $\ln g(x)$ | $\dfrac{g'(x)}{g(x)}$ | $\dfrac{d}{dx}\ln(x^2+1) = \dfrac{2x}{x^2+1}$ |
| $\sqrt{g(x)}$ | $\dfrac{g'(x)}{2\sqrt{g(x)}}$ | $\dfrac{d}{dx}\sqrt{1+4x} = \dfrac{2}{\sqrt{1+4x}}$ |
| $a^{g(x)}$ | $a^{g(x)}\ln a\cdot g'(x)$ | $\dfrac{d}{dx}2^{3x} = 3\ln 2\cdot 2^{3x}$ |

### Chain rule worked examples

**Example 1.** $y = (3x^2+1)^5$

1. Outside: ==(something) to the 5th==. Inside: ++3x² + 1++.
2. Derivative of the outside, inside untouched: $\color{orange}{5(}\color{teal}{3x^2+1}\color{orange}{)^4}$.
3. Derivative of the inside: $\color{teal}{6x}$.
4. Multiply and tidy up:

$$y' = \color{orange}{5(}\color{teal}{3x^2+1}\color{orange}{)^4}\cdot\color{teal}{6x} = 30x(3x^2+1)^4$$

($y'$ means $\dfrac{dy}{dx}$.)

**Example 2.** Where does the power sit?

$\sin^3(2x)$ means $\big[\sin(2x)\big]^3$. That is three layers: a cube, then a sine, then $2x$. Peel from the outside in.

$$\frac{d}{dx}\big[\sin(2x)\big]^3 = 3\sin^2(2x)\cdot\cos(2x)\cdot 2 = 6\sin^2(2x)\cos(2x)$$

Compare $\sin(x^3)$. Here the cube is inside the sine, so there are only two layers.

$$\frac{d}{dx}\sin(x^3) = \cos(x^3)\cdot 3x^2 = 3x^2\cos(x^3)$$

**Example 3.** Three layers: $y = e^{\sin(x^2)}$

1. Layer 1, ==e to the something==: gives $e^{\sin(x^2)}$.
2. Layer 2, ++sin of something++: gives $\cos(x^2)$.
3. Layer 3, $x^2$: gives $2x$.
4. Multiply all three:

$$y' = e^{\sin(x^2)}\cdot\cos(x^2)\cdot 2x = 2x\cos(x^2)\,e^{\sin(x^2)}$$

::: note Chain rule inside a product
If the function is a product, do the product rule first. The chain rule shows up inside a piece.

For $y = x^3e^{-2x}$, the piece $e^{-2x}$ has derivative $e^{-2x}\cdot(-2)$. So

$$y' = 3x^2e^{-2x} + x^3e^{-2x}(-2) = x^2e^{-2x}(3-2x)$$

Same idea inside a quotient: run the quotient rule and chain any piece that needs it.
:::

### Chain rule from a table

AP loves this. Write the formula first. Then work **from the inside out**: find $g(a)$ first, then look up $f'$ at that value.

| $x$ | $f(x)$ | $f'(x)$ | $g(x)$ | $g'(x)$ |
|---|---|---|---|---|
| 1 | 3 | $-2$ | 2 | 5 |
| 2 | 4 | 7 | 1 | $-3$ |
| 3 | 1 | 6 | 2 | $\dfrac{1}{2}$ |

**Example 4.** $h(x) = f(g(x))$. Find $h'(1)$.

1. Formula: $h'(1) = f'(g(1))\cdot g'(1)$.
2. Inside first: $g(1) = 2$.
3. Look up: $f'(2) = 7$ and $g'(1) = 5$.
4. Multiply: $h'(1) = 7\cdot 5 = 35$.

**Example 5.** $k(x) = [g(x)]^3$. Find $k'(2)$.

$$k'(2) = 3[g(2)]^2\cdot g'(2) = 3(1)^2(-3) = -9$$

**Example 6.** $m(x) = g(f(x))$. Find $m'(3)$.

Inside first: $f(3) = 1$. So $m'(3) = g'(1)\cdot f'(3) = 5\cdot 6 = 30$.

### Chain rule from a graph

Same move, but you read the numbers off a graph. When the graph is made of straight segments, $f'$ is just the slope of the segment you are on.

<figure class="diagram">
<svg viewBox="0 0 480 320" role="img" aria-labelledby="fg-title" xmlns="http://www.w3.org/2000/svg">
<title id="fg-title">Graph of f made of three line segments through (0, 1), (2, 5), (4, 4) and (6, 0). Slopes are 2, then negative one half, then negative 2.</title>
<g font-family="-apple-system,Segoe UI,Roboto,Arial,sans-serif" font-size="13" fill="currentColor">
<line x1="50" y1="40" x2="50" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="280" x2="410" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<text x="50" y="298" text-anchor="middle">0</text>
<text x="40" y="284" text-anchor="end">0</text>
<line x1="110" y1="40" x2="110" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="240" x2="410" y2="240" stroke="currentColor" stroke-opacity="0.15"/>
<text x="110" y="298" text-anchor="middle">1</text>
<text x="40" y="244" text-anchor="end">1</text>
<line x1="170" y1="40" x2="170" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="200" x2="410" y2="200" stroke="currentColor" stroke-opacity="0.15"/>
<text x="170" y="298" text-anchor="middle">2</text>
<text x="40" y="204" text-anchor="end">2</text>
<line x1="230" y1="40" x2="230" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="160" x2="410" y2="160" stroke="currentColor" stroke-opacity="0.15"/>
<text x="230" y="298" text-anchor="middle">3</text>
<text x="40" y="164" text-anchor="end">3</text>
<line x1="290" y1="40" x2="290" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="120" x2="410" y2="120" stroke="currentColor" stroke-opacity="0.15"/>
<text x="290" y="298" text-anchor="middle">4</text>
<text x="40" y="124" text-anchor="end">4</text>
<line x1="350" y1="40" x2="350" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="80" x2="410" y2="80" stroke="currentColor" stroke-opacity="0.15"/>
<text x="350" y="298" text-anchor="middle">5</text>
<text x="40" y="84" text-anchor="end">5</text>
<line x1="410" y1="40" x2="410" y2="280" stroke="currentColor" stroke-opacity="0.15"/>
<line x1="50" y1="40" x2="410" y2="40" stroke="currentColor" stroke-opacity="0.15"/>
<text x="410" y="298" text-anchor="middle">6</text>
<text x="40" y="44" text-anchor="end">6</text>
<line x1="50" y1="280" x2="440.0" y2="280" stroke="currentColor" stroke-width="1.5"/>
<line x1="50" y1="280" x2="50" y2="20.0" stroke="currentColor" stroke-width="1.5"/>
<text x="448.0" y="284" font-style="italic">x</text>
<text x="50" y="14.0" text-anchor="middle" font-style="italic">y</text>
<polyline points="50,240 170,80 290,120 410,280" fill="none" style="stroke:var(--outer)" stroke-width="3"/>
<circle cx="50" cy="240" r="4.5" style="fill:var(--outer)"/>
<text x="62" y="258" text-anchor="start" font-weight="600">(0, 1)</text>
<circle cx="170" cy="80" r="4.5" style="fill:var(--outer)"/>
<text x="170" y="68" text-anchor="middle" font-weight="600">(2, 5)</text>
<circle cx="290" cy="120" r="4.5" style="fill:var(--outer)"/>
<text x="298" y="110" text-anchor="start" font-weight="600">(4, 4)</text>
<circle cx="410" cy="280" r="4.5" style="fill:var(--outer)"/>
<text x="416" y="266" text-anchor="start" font-weight="600">(6, 0)</text>
<text x="83.0" y="136.0" style="fill:var(--inner)" font-weight="600">slope 2</text>
<text x="230.0" y="70.0" style="fill:var(--inner)" font-weight="600">slope −1/2</text>
<text x="359.0" y="176.0" style="fill:var(--inner)" font-weight="600">slope −2</text>
<text x="68.0" y="56.0" font-size="16" font-style="italic" style="fill:var(--outer)">y = f(x)</text>
</g>
</svg>
<figcaption>The graph of f is three straight segments, so f′ on each piece is just that segment's slope. At the corners x = 2 and x = 4, f′ does not exist.</figcaption>
</figure>

Values you can read off the graph:

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| $f(x)$ | 1 | 3 | 5 | 4.5 | 4 | 2 | 0 |
| $f'(x)$ | 2 | 2 | does not exist | $-\dfrac{1}{2}$ | does not exist | $-2$ | $-2$ |

The endpoint slopes at $x = 0$ and $x = 6$ are one-sided, since the graph ends there. Quiz questions only use $x$ values inside a segment.

**Example 7.** $h(x) = f(3x)$. Find $h'(1)$.

Outside $f$, inside $3x$. So $h'(1) = f'(3\cdot 1)\cdot 3 = f'(3)\cdot 3 = \left(-\dfrac{1}{2}\right)(3) = -\dfrac{3}{2}$.

**Example 8.** $p(x) = [f(x)]^2$. Find $p'(1)$.

$$p'(1) = 2f(1)\cdot f'(1) = 2(3)(2) = 12$$

### Chain rule traps

:::: compare Forgetting the inside derivative
::: wrong
$\dfrac{d}{dx}\sin(5x) = \cos(5x)$
:::
::: right
$\dfrac{d}{dx}\sin(5x) = \cos(5x)\cdot 5 = 5\cos(5x)$
:::
::::

:::: compare Plugging the wrong number into the outside derivative
::: wrong
In Example 4: $h'(1) = f'(1)\cdot g'(1) = (-2)(5) = -10$. This is a classic wrong multiple-choice option.
:::
::: right
The outside derivative is evaluated at the inside value: $f'(g(1))\cdot g'(1) = f'(2)\cdot 5 = 35$.
:::
::::

:::: compare Stopping one layer early
::: wrong
$\dfrac{d}{dx}\sin^3(2x) = 3\sin^2(2x)\cos(2x)$
:::
::: right
The $2x$ layer adds a factor of 2: $6\sin^2(2x)\cos(2x)$.
:::
::::

:::: compare Using a corner of the graph
::: wrong
"$f'(2)$ is about 0, since the graph peaks there."
:::
::: right
At a corner, $f'$ does not exist. Only use slopes from inside a segment.
:::
::::

## Implicit differentiation

Use this when $x$ and $y$ are mixed together, like $x^2 + y^2 = 25$, and you cannot easily solve for $y$.

### The implicit move

::: note The move
Take $\dfrac{d}{dx}$ of both sides. Every time you differentiate something with $y$ in it, multiply by $\dfrac{dy}{dx}$. Then solve for $\dfrac{dy}{dx}$.
:::

Why the extra factor? $y$ is secretly a function of $x$, so every $y$ term is a chain rule. The power (or sin, or e^) is the ==outside==, ++y++ is the inside, so ++dy/dx++ is the inside derivative:

$$\frac{d}{dx}\big[y^n\big] = ny^{n-1}\color{teal}{\frac{dy}{dx}} \qquad \frac{d}{dx}\big[\sin y\big] = \cos y\,\color{teal}{\frac{dy}{dx}} \qquad \frac{d}{dx}\big[e^y\big] = e^y\,\color{teal}{\frac{dy}{dx}}$$

Steps in order:

1. Differentiate both sides. Plain $x$ terms work as usual. Constants become 0.
2. Every $y$ term gets a factor of $\dfrac{dy}{dx}$.
3. A term like $xy$ is a product. Use the product rule: $\dfrac{d}{dx}(xy) = y + x\dfrac{dy}{dx}$.
4. Move every $\dfrac{dy}{dx}$ term to one side. Factor out $\dfrac{dy}{dx}$. Divide.
5. For a slope at a point, plug in **both** $x$ and $y$.

### Tangent lines and flat or vertical spots

Write your answer as a fraction, $\dfrac{dy}{dx} = \dfrac{\text{top}}{\text{bottom}}$.

| You want | Set | Then |
|---|---|---|
| Slope at a point | Plug in the point | Line: $y - y_1 = m(x - x_1)$ |
| Horizontal tangent | top $= 0$ (bottom not 0) | Substitute back into the **original** curve to get points |
| Vertical tangent | bottom $= 0$ (top not 0) | Substitute back into the **original** curve to get points |

### Implicit worked examples

**Example 9.** The circle $x^2 + y^2 = 25$.

1. Differentiate: $2x + 2y\dfrac{dy}{dx} = 0$.
2. Solve: $\dfrac{dy}{dx} = -\dfrac{x}{y}$.
3. At $(3, 4)$: slope $= -\dfrac{3}{4}$. Tangent line: $y - 4 = -\dfrac{3}{4}(x - 3)$.
4. Horizontal: top $= 0$ means $x = 0$. The curve gives $y = \pm 5$. Points $(0, 5)$ and $(0, -5)$.
5. Vertical: bottom $= 0$ means $y = 0$. The curve gives $x = \pm 5$. Points $(5, 0)$ and $(-5, 0)$.

**Example 10.** $x^2 + xy + y^2 = 7$ at the point $(1, 2)$. Check it is on the curve: $1 + 2 + 4 = 7$. Good.

1. Differentiate. The $xy$ term needs the product rule:

$$2x + \underbrace{\left(y + x\frac{dy}{dx}\right)}_{\text{product rule on } xy} + 2y\frac{dy}{dx} = 0$$

2. Collect: $\dfrac{dy}{dx}(x + 2y) = -(2x + y)$.
3. Solve: $\dfrac{dy}{dx} = -\dfrac{2x + y}{x + 2y}$.
4. At $(1, 2)$: $\dfrac{dy}{dx} = -\dfrac{4}{5}$. Tangent line: $y - 2 = -\dfrac{4}{5}(x - 1)$.
5. Horizontal: set $2x + y = 0$, so $y = -2x$. Plug into the curve: $x^2 - 2x^2 + 4x^2 = 3x^2 = 7$. Points $\left(\sqrt{7/3},\, -2\sqrt{7/3}\right)$ and $\left(-\sqrt{7/3},\, 2\sqrt{7/3}\right)$.
6. Vertical: set $x + 2y = 0$, so $x = -2y$. Plug in: $4y^2 - 2y^2 + y^2 = 3y^2 = 7$. Points $\left(-2\sqrt{7/3},\, \sqrt{7/3}\right)$ and $\left(2\sqrt{7/3},\, -\sqrt{7/3}\right)$.

**Example 11.** Trig with $y$: $y + \sin y = 2x$.

1. Differentiate: $\dfrac{dy}{dx} + \cos y\,\dfrac{dy}{dx} = 2$.
2. Factor: $\dfrac{dy}{dx}(1 + \cos y) = 2$, so $\dfrac{dy}{dx} = \dfrac{2}{1 + \cos y}$.
3. At $(0, 0)$: $\dfrac{2}{1 + 1} = 1$.
4. Vertical tangents: bottom $= 0$ means $\cos y = -1$, for example $y = \pi$. The curve gives $2x = \pi + 0$, so one such point is $\left(\dfrac{\pi}{2}, \pi\right)$.

### Implicit traps

:::: compare The missing dy/dx (the number one lost point)
::: wrong
$\dfrac{d}{dx}(y^2) = 2y$
:::
::: right
$\dfrac{d}{dx}(y^2) = 2y\dfrac{dy}{dx}$
:::
::::

:::: compare Skipping the product rule on xy
::: wrong
$\dfrac{d}{dx}(xy) = \dfrac{dy}{dx}$
:::
::: right
$\dfrac{d}{dx}(xy) = y + x\dfrac{dy}{dx}$
:::
::::

:::: compare The constant on the right side
::: wrong
$x^2 + y^2 = 25$ becomes $2x + 2y\dfrac{dy}{dx} = 25$
:::
::: right
The derivative of 25 is 0: $2x + 2y\dfrac{dy}{dx} = 0$
:::
::::

:::: compare Stopping at the condition
::: wrong
"Horizontal tangent when $y = -2x$." That is a line, not a point.
:::
::: right
Substitute $y = -2x$ back into the original curve and solve for the actual points.
:::
::::

## Derivatives of inverse functions

You never need a formula for $f^{-1}$. You only need **one point** on it and the slope of $f$ at the matching point.

### The inverse move

::: note The move
Flip the point, flip the slope.

$$\left(f^{-1}\right)'(a) = \frac{1}{f'\big(\color{teal}{f^{-1}(a)}\big)}$$

If $(b, a)$ is on $f$ with slope $m$, then $(a, b)$ is on $f^{-1}$ with slope $\dfrac{1}{m}$.
:::

Steps in order:

1. Find $b = f^{-1}(a)$. That means solve $f(x) = a$. On a quiz, it is built to work by guessing: try $x = 0$, $1$, $-1$, $2$. In a table, find $a$ in the $f(x)$ row and read off the $x$.
2. Compute $f'(b)$.
3. Flip it: the answer is $\dfrac{1}{f'(b)}$.

### Inverse worked examples

**Example 12.** From an equation. $f(x) = x^3 + 2x + 1$. Find $\left(f^{-1}\right)'(4)$.

1. Solve $x^3 + 2x + 1 = 4$. Try $x = 1$: $1 + 2 + 1 = 4$. So $f^{-1}(4) = 1$.
2. $f'(x) = 3x^2 + 2$, so $f'(1) = 5$.
3. Flip: $\left(f^{-1}\right)'(4) = \dfrac{1}{5}$.

Tangent line to $f^{-1}$ at $x = 4$: the point is $(4, 1)$ and the slope is $\dfrac{1}{5}$, so $y - 1 = \dfrac{1}{5}(x - 4)$.

**Example 13.** From a table. Find $\left(f^{-1}\right)'(5)$.

| $x$ | 1 | 2 | 3 | 5 |
|---|---|---|---|---|
| $f(x)$ | 2 | 5 | 7 | 9 |
| $f'(x)$ | 3 | 4 | 6 | 2 |

1. Find 5 in the $f(x)$ row. It is under $x = 2$. So $f^{-1}(5) = 2$.
2. $f'(2) = 4$.
3. Flip: $\left(f^{-1}\right)'(5) = \dfrac{1}{4}$.

**Example 14.** With trig. $f(x) = 2x + \cos x$. Find $\left(f^{-1}\right)'(1)$.

1. Try $x = 0$: $f(0) = 0 + 1 = 1$. So $f^{-1}(1) = 0$.
2. $f'(x) = 2 - \sin x$, so $f'(0) = 2$.
3. Flip: $\dfrac{1}{2}$.

### Inverse traps

:::: compare Plugging a into f prime
::: wrong
In Example 13: $\dfrac{1}{f'(5)} = \dfrac{1}{2}$. That used the $x = 5$ column.
:::
::: right
First find $f^{-1}(5) = 2$, then use $f'(2)$: $\dfrac{1}{4}$.
:::
::::

:::: compare Mixing up inverse and reciprocal
::: wrong
$f^{-1}(x) = \dfrac{1}{f(x)}$, or $\left(f^{-1}\right)'(x) = \dfrac{1}{f'(x)}$
:::
::: right
The $-1$ means inverse, not reciprocal. The input of $f'$ must be $f^{-1}(a)$.
:::
::::

:::: compare Forgetting to flip
::: wrong
$\left(f^{-1}\right)'(4) = f'(1) = 5$
:::
::: right
$\left(f^{-1}\right)'(4) = \dfrac{1}{f'(1)} = \dfrac{1}{5}$
:::
::::

## Quick summary

::: takeaways
- **Chain rule:** outside derivative at the inside, times the inside derivative. One factor per layer.
- **Tables and graphs:** find the inside value first, then look up $f'$ there.
- **Implicit:** differentiate both sides, tack $\dfrac{dy}{dx}$ onto every $y$ term, solve. Product rule on $xy$.
- **Horizontal tangent:** top of $\dfrac{dy}{dx}$ is 0. **Vertical tangent:** bottom is 0. Then plug back into the curve.
- **Inverse:** $\left(f^{-1}\right)'(a) = \dfrac{1}{f'(b)}$ where $f(b) = a$. Flip the point, flip the slope.
:::

::: tips
- Write the setup before the numbers, like $f'(g(2))\cdot g'(2)$. Teachers give credit for it.
- You do not have to simplify fully. A correct unsimplified derivative is still correct.
- For a slope at a point on an implicit curve, check the point is actually on the curve first.
- Not on this quiz: inverse trig derivatives (section 3.4) and implicit second derivatives.
:::

## Practice quiz

No calculator. 12 problems. Answers are in the next section, so try them all first.

Use this table for problems 5 and 11:

| $x$ | $f(x)$ | $f'(x)$ | $g(x)$ | $g'(x)$ |
|---|---|---|---|---|
| 1 | 4 | $-1$ | 3 | 2 |
| 2 | 1 | 5 | 1 | $-3$ |
| 3 | 2 | 6 | 4 | 7 |

For problem 6, use the graph of $f$ from [the chain rule graph section](#chain-rule-from-a-graph).

**1.** (Multiple choice) $\dfrac{d}{dx}\sin^2(3x) =$

- **A.** $2\sin(3x)\cos(3x)$
- **B.** $6\sin(3x)\cos(3x)$
- **C.** $6\sin(3x)$
- **D.** $6\cos(3x)$

**2.** Find $\dfrac{dy}{dx}$ for $y = \dfrac{1}{(x^2+4)^3}$.

**3.** Find $\dfrac{dy}{dx}$ for $y = e^{\tan(4x)}$.

**4.** Find $\dfrac{dy}{dx}$ for $y = x^2\ln(5x+1)$.

**5.** (Multiple choice) Using the table, if $h(x) = f(g(x))$, then $h'(2) =$

- **A.** $3$
- **B.** $-15$
- **C.** $-3$
- **D.** $5$

**6.** Using the graph of $f$, let $k(x) = \sqrt{f(x)}$. Find $k'(5)$.

**7.** (Multiple choice) If $x^3 + y^3 = 6xy$, then $\dfrac{dy}{dx} =$

- **A.** $-\dfrac{x^2}{y^2}$
- **B.** $\dfrac{x^2 - 2y}{y^2 - 2x}$
- **C.** $\dfrac{2y - x^2}{y^2 - 2x}$
- **D.** $\dfrac{2y - x^2}{y^2}$

**8.** Write the equation of the line tangent to $x^2 + 3xy + y^2 = 11$ at the point $(1, 2)$.

**9.** For the curve $x^2 - xy + y^2 = 3$: (a) find all points where the tangent line is horizontal; (b) find all points where it is vertical.

**10.** (Multiple choice) Let $f(x) = x^3 + x - 2$. Then $\left(f^{-1}\right)'(0) =$

- **A.** $1$
- **B.** $4$
- **C.** $\dfrac{1}{13}$
- **D.** $\dfrac{1}{4}$

**11.** Using the table, $g$ is invertible. Find $\left(g^{-1}\right)'(1)$.

**12.** Let $f(x) = x^5 + 2x^3 + x$. Write the equation of the line tangent to the graph of $f^{-1}$ at $x = 4$.

## Answer key

::: details 1. Answer
**Answer: B.** $2\sin(3x)\cdot\cos(3x)\cdot 3 = 6\sin(3x)\cos(3x)$. Choice A forgot the inside factor of 3.
:::

::: details 2. Answer
Rewrite as $y = (x^2+4)^{-3}$. Then $y' = -3(x^2+4)^{-4}\cdot 2x = \dfrac{-6x}{(x^2+4)^4}$.
:::

::: details 3. Answer
$y' = e^{\tan(4x)}\cdot\sec^2(4x)\cdot 4 = 4\sec^2(4x)\,e^{\tan(4x)}$.
:::

::: details 4. Answer
Product rule, with a chain inside the log: $y' = 2x\ln(5x+1) + x^2\cdot\dfrac{5}{5x+1} = 2x\ln(5x+1) + \dfrac{5x^2}{5x+1}$.
:::

::: details 5. Answer
**Answer: A.** $h'(2) = f'(g(2))\cdot g'(2) = f'(1)\cdot(-3) = (-1)(-3) = 3$. Choice B is the trap $f'(2)\cdot g'(2)$.
:::

::: details 6. Answer
$k'(x) = \dfrac{f'(x)}{2\sqrt{f(x)}}$. From the graph, $f(5) = 2$ and $f'(5) = -2$. So $k'(5) = \dfrac{-2}{2\sqrt{2}} = -\dfrac{\sqrt{2}}{2}$.
:::

::: details 7. Answer
**Answer: C.** $3x^2 + 3y^2\dfrac{dy}{dx} = 6y + 6x\dfrac{dy}{dx}$ (product rule on $6xy$). Collect: $\dfrac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$. Divide by 3 on top and bottom: $\dfrac{dy}{dx} = \dfrac{2y - x^2}{y^2 - 2x}$.
:::

::: details 8. Answer
$2x + 3y + 3x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{2x + 3y}{3x + 2y}$. At $(1, 2)$: $-\dfrac{8}{7}$. Line: $y - 2 = -\dfrac{8}{7}(x - 1)$.
:::

::: details 9. Answer
$2x - y - x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = \dfrac{y - 2x}{2y - x}$.

(a) Horizontal: $y = 2x$. Plug in: $x^2 - 2x^2 + 4x^2 = 3x^2 = 3$, so $x = \pm 1$. Points $(1, 2)$ and $(-1, -2)$. The bottom is $\pm 3$ there, not 0, so both count.

(b) Vertical: $x = 2y$. Plug in: $4y^2 - 2y^2 + y^2 = 3y^2 = 3$, so $y = \pm 1$. Points $(2, 1)$ and $(-2, -1)$. The top is $\mp 3$ there, not 0, so both count.
:::

::: details 10. Answer
**Answer: D.** Solve $x^3 + x - 2 = 0$: $x = 1$ works. $f'(x) = 3x^2 + 1$, so $f'(1) = 4$ and the answer is $\dfrac{1}{4}$. Choice A is the trap $\dfrac{1}{f'(0)}$.
:::

::: details 11. Answer
$g(2) = 1$, so $g^{-1}(1) = 2$. Then $\left(g^{-1}\right)'(1) = \dfrac{1}{g'(2)} = -\dfrac{1}{3}$. Not $\dfrac{1}{g'(1)} = \dfrac{1}{2}$.
:::

::: details 12. Answer
$f(1) = 1 + 2 + 1 = 4$, so $f^{-1}(4) = 1$ and the point is $(4, 1)$. $f'(x) = 5x^4 + 6x^2 + 1$, so $f'(1) = 12$ and the slope is $\dfrac{1}{12}$. Line: $y - 1 = \dfrac{1}{12}(x - 4)$.
:::
