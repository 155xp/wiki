---
visibility: public
title: "Calc Unit 3 Test: Composite, Implicit, Inverse Functions"
description: A study page for the AP Calculus AB Unit 3 review, sections 3.1-3.6, with lessons and practice on the chain rule, implicit differentiation, derivatives of inverse functions, derivatives of inverse trig functions, choosing the right rule, and higher-order derivatives, including implicit ones.
updated: 2026-11-13
infobox:
  title: Test cheat sheet
  Test: Thursday, November 19, 2026
  Covers: Unit 3 review, sections 3.1-3.6
  Chain rule: "$\\frac{d}{dx}f(g(x)) = f'(g(x))\\,g'(x)$"
  Implicit: "Every $y$ term picks up a factor of $\\frac{dy}{dx}$"
  Inverse function: "$(f^{-1})'(a) = \\frac{1}{f'(b)}$, where $f(b) = a$"
  Inverse sine: "$\\frac{d}{dx}\\arcsin x = \\frac{1}{\\sqrt{1-x^2}}$"
  Inverse tangent: "$\\frac{d}{dx}\\arctan x = \\frac{1}{1+x^2}$"
  Inverse cosine: "Same as inverse sine, with a minus sign"
  Implicit second derivative: "Take the derivative of $\\frac{dy}{dx}$, then swap in $\\frac{dy}{dx}$ wherever it shows up"
---

**Unit 3 review, sections 3.1-3.6.** Almost everything in this unit grows from one idea: when a function sits inside another, their rates multiply. That's the **chain rule**. **Implicit differentiation** uses it on a hidden $y$, **inverse function derivatives** and **inverse trig derivatives** use it to flip a slope, and **higher-order derivatives** use it again on a derivative. **Choosing the right rule** is about telling which one a problem needs.

## One-page review sheet

::: note Chain rule
$$\frac{d}{dx}f(g(x)) = f'(g(x))\cdot g'(x)$$

- **Steps:** name the layers from the outside in. Take each layer's derivative with its inside untouched. Multiply them all.
- **Given values:** look up the inside's value $g(a)$ first, then use $f'(g(a))\cdot g'(a)$.
- **Traps:** using $f'(a)\cdot g'(a)$. Dropping the last layer's factor, like writing $\cos(5x)$ for the derivative of $\sin(5x)$.
:::

::: note Implicit differentiation
- **Steps:** take the derivative of both sides. Every $y$ term gets a $\dfrac{dy}{dx}$, so $y^2$ becomes $2y\dfrac{dy}{dx}$. Use the product rule on $xy$. Gather the $\dfrac{dy}{dx}$ terms, factor, divide.
- **Tangent lines:** plug in both $x$ and $y$. Horizontal means the top of $\dfrac{dy}{dx}$ is 0. Vertical means the bottom is 0. Plug that condition back into the curve to get points. The normal slope is $-\dfrac{1}{m}$.
- **Traps:** a missing $\dfrac{dy}{dx}$. Skipping the product rule on $xy$.
:::

::: note Inverse function derivatives
$$\left(f^{-1}\right)'(a) = \frac{1}{f'(b)} \qquad \text{where } f(b) = a$$

- **Steps:** find the input $b$ with $f(b) = a$. Guess 0, 1, $-1$, 2, or find $a$ in the $f(x)$ row of a table. Read $f'(b)$. Flip it.
- **Tangent line given:** the point $(b, a)$ flips to $(a, b)$ and the slope $m$ flips to $\dfrac{1}{m}$.
- **Traps:** using $\dfrac{1}{f'(a)}$. Forgetting to flip.
:::

::: note Inverse trig derivatives
$$\frac{d}{dx}\arcsin u = \frac{u'}{\sqrt{1 - u^2}} \qquad \frac{d}{dx}\arctan u = \frac{u'}{1 + u^2} \qquad \frac{d}{dx}\operatorname{arcsec} u = \frac{u'}{|u|\sqrt{u^2 - 1}}$$

- **The "co" versions** (arccos, arccot, arccsc) are the same with a minus sign.
- **Values:** $\arcsin\dfrac{1}{2} = \dfrac{\pi}{6}$, $\arccos 0 = \dfrac{\pi}{2}$, $\arctan 1 = \dfrac{\pi}{4}$.
- **Traps:** $\sin^{-1}x$ means arcsin, not $\dfrac{1}{\sin x}$. Inverse tangent has no square root. Forgetting the $u'$ on top.
:::

::: note Higher-order derivatives
- **Steps:** $f''$ is the derivative of $f'$. Simplify $f'$ first. The second round often needs the product or quotient rule.
- **Implicit $\dfrac{d^2y}{dx^2}$:** take the derivative of your $\dfrac{dy}{dx}$ fraction (quotient rule), tag $\dfrac{dy}{dx}$ on every $y$, swap in the $\dfrac{dy}{dx}$ formula, then simplify with the original equation. On a circle $x^2 + y^2 = r^2$ this gives $-\dfrac{r^2}{y^3}$.
- **Patterns and motion:** sin and cos repeat every 4 derivatives. Velocity is $s'$, acceleration is $s''$, and the same signs mean speeding up.
- **Traps:** leaving $\dfrac{dy}{dx}$ in the second derivative. Writing $f''$ as $(f')^2$.
:::

## The chain rule

### What is going on

Lots of functions are built in layers. To work out $\sqrt{1 + \sin(4x)}$, you'd find $4x$ first, then take its sine, then add 1, then take the square root. The last step you'd do is the ==outside== layer. Everything it's applied to is the ++inside++.

When $x$ changes a little, the inside changes, and the outside reacts to that change. So the total rate is the outside's rate times the inside's rate. If the inside changes 3 times as fast as $x$, and the outside changes 2 times as fast as the inside, the whole thing changes $3 \cdot 2 = 6$ times as fast as $x$. Rates in a chain multiply.

### How to spot it

The input to a function isn't plain $x$. Look for a power of a parenthesis, a root of an expression, something in an exponent, or something inside sin, cos, tan or ln. Watch where a power sits. $\cos^5(3x)$ means $\big[\cos(3x)\big]^5$, so the power is the outermost layer.

::: note The move
Take the derivative of the ==outside== and leave the ++inside++ untouched. Then multiply by the derivative of the ++inside++. With more layers, keep going inward and multiply one factor per layer.

$$\frac{d}{dx}\,\color{orange}{f(}\color{teal}{g(x)}\color{orange}{)} = \color{orange}{f'(}\color{teal}{g(x)}\color{orange}{)}\cdot\color{teal}{g'(x)} \qquad \text{or} \qquad \frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$$

In the second form, $u$ is the inside. $\dfrac{dy}{du}$ is the outside's rate and $\dfrac{du}{dx}$ is the inside's rate.
:::

**Given values instead of formulas.** Many test problems give you a few values of $f$, $f'$, $g$ and $g'$ instead of formulas. The move is the same, with one extra step: find the inside's **value** first, because that number is what you feed to the outside's derivative.

### Worked example

**Example 1.** Find $\dfrac{dy}{dx}$ for $y = \sqrt{1 + \sin(4x)}$.

1. **Name the layers.** From the outside in: square root, then $1 + \sin(\ldots)$, then $4x$.
2. **Square root layer.** The square root is the power $\dfrac{1}{2}$. Its derivative is $\dfrac{1}{2\sqrt{\text{inside}}}$, with the inside left alone: $\dfrac{1}{2\sqrt{1 + \sin(4x)}}$.
3. **Middle layer.** The 1 is a constant, so it gives 0. Sine gives cosine, with $4x$ still inside: $\cos(4x)$.
4. **Last layer.** $4x$ gives 4.
5. **Multiply all three**, since rates in a chain multiply: $\dfrac{dy}{dx} = \dfrac{4\cos(4x)}{2\sqrt{1 + \sin(4x)}} = \dfrac{2\cos(4x)}{\sqrt{1 + \sin(4x)}}$.

### Traps

:::: compare Forgetting the inside's derivative
::: wrong
$\dfrac{d}{dx}\cos(x^3) = -\sin(x^3)$
:::
::: right
The inside $x^3$ adds a factor of $3x^2$: $-3x^2\sin(x^3)$
:::
::::

:::: compare Feeding the outside the wrong number
::: wrong
For $h(x) = f(g(x))$, using $h'(2) = f'(2)\cdot g'(2)$
:::
::: right
The outside's input is $g(2)$, so $h'(2) = f'\big(g(2)\big)\cdot g'(2)$. Look up $g(2)$ first.
:::
::::

:::: compare Differentiating the inside twice
::: wrong
$\dfrac{d}{dx}\sin(x^2) = \cos(2x)\cdot 2x$
:::
::: right
The outside keeps the inside untouched: $\cos(x^2)\cdot 2x$
:::
::::

### Try it

**Try 1.** (Multiple choice) $\dfrac{d}{dx}\tan^3(2x) =$

- **A.** $3\tan^2(2x)\sec^2(2x)$
- **B.** $6\tan^2(2x)$
- **C.** $6\sec^2(2x)$
- **D.** $3\sec^6(2x)$
- **E.** $6\tan^2(2x)\sec^2(2x)$

::: details Steps
1. **Three layers.** From the outside in: cubing, then tangent, then $2x$.
2. **Cube layer.** $3\tan^2(2x)$, with the inside left alone.
3. **Tangent layer.** Tangent gives secant squared: $\sec^2(2x)$.
4. **Last layer.** $2x$ gives 2. Multiply all three.
5. **Answer: E.** Choice A forgot the 2 from the last layer.
:::

**Try 2.** Let $f$ and $g$ be differentiable with $f(0) = 1$, $f'(0) = 4$, $f'(2) = 5$, $g(0) = 2$ and $g'(0) = -2$. If $h(x) = f(g(x)) + \cos(3x)\,f(x)$, find $h'(0)$.

::: details Steps
1. **Split it.** It's a sum, so take the derivative of each piece.
2. **First piece, chain rule.** $f'(g(x))\cdot g'(x)$. At 0, the inside is $g(0) = 2$, so this is $f'(2)\cdot g'(0) = 5\cdot(-2) = -10$.
3. **Second piece, product rule.** $-3\sin(3x)\,f(x) + \cos(3x)\,f'(x)$. At 0, $\sin 0 = 0$ and $\cos 0 = 1$, so this is $0 + 1\cdot 4 = 4$.
4. **Add.** **Answer:** $h'(0) = -10 + 4 = -6$.
:::

**Try 3.** Find the tangent line to $y = \sin^2 x$ at $x = \dfrac{\pi}{4}$.

::: details Steps
1. **Point.** $\sin\left(\dfrac{\pi}{4}\right) = \dfrac{\sqrt{2}}{2}$, and squaring it gives $\dfrac{1}{2}$. The point is $\left(\dfrac{\pi}{4}, \dfrac{1}{2}\right)$.
2. **Derivative.** The square is the outside and $\sin x$ the inside: $2\sin x\cos x$.
3. **Slope.** $2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{2}}{2} = 1$.
4. **Answer:** $y - \dfrac{1}{2} = x - \dfrac{\pi}{4}$.
:::

## Implicit differentiation

### What is going on

Some curves, like $x^2y + y^3 = 10$, can't easily be solved for "$y =$ something." They still have a slope at every point. The trick is to treat $y$ as a function of $x$ that you can't see.

Then any $y$ term is a layered function. In $y^3$, the cube is the outside and $y$ is the inside. The chain rule says to multiply by the inside's derivative, and the derivative of $y$ is $\dfrac{dy}{dx}$ (also written $y'$, read "y prime"). So every time you take the derivative of a $y$ term, a $\dfrac{dy}{dx}$ tags along. $x$ terms don't get one, because the derivative of $x$ is just 1.

### How to spot it

$x$ and $y$ are mixed together in one equation. The question asks for $\dfrac{dy}{dx}$, a tangent or normal line at a point, or where the tangent is horizontal or vertical.

::: note The move
1. Take the derivative of both sides.
2. Attach $\dfrac{dy}{dx}$ to every $y$ term you take the derivative of. Use the product rule on terms like $x^2y$, where $x$ and $y$ are multiplied.
3. Move every term with $\dfrac{dy}{dx}$ to one side and everything else to the other.
4. Factor out $\dfrac{dy}{dx}$ and divide.

The answer is usually a fraction. **Horizontal tangent:** the top is zero, because a flat line has slope 0. **Vertical tangent:** the bottom is zero, because the slope blows up. Either condition describes a line, not a point, so plug it back into the curve to find the actual points. A **normal line** is perpendicular to the tangent, so its slope is the negative reciprocal: flip the tangent slope and change its sign.
:::

### Worked example

**Example 2.** Find the tangent line to $x^2y + y^3 = 10$ at the point $(1, 2)$.

1. **Check the point.** $1\cdot 2 + 8 = 10$, so it's on the curve.
2. **Take the derivative of $x^2y$.** It's a product, so it's (derivative of $x^2$)(y) + ($x^2$)(derivative of $y$): $2xy + x^2\dfrac{dy}{dx}$.
3. **Take the derivative of $y^3$.** The cube is the outside, so $3y^2$, and $y$ is the inside, so $\dfrac{dy}{dx}$ tags along: $3y^2\dfrac{dy}{dx}$.
4. **The 10 is a constant**, so it gives 0. The full line is $2xy + x^2\dfrac{dy}{dx} + 3y^2\dfrac{dy}{dx} = 0$.
5. **Gather and factor.** $\dfrac{dy}{dx}\left(x^2 + 3y^2\right) = -2xy$, so $\dfrac{dy}{dx} = -\dfrac{2xy}{x^2 + 3y^2}$.
6. **Plug in both coordinates**, since the slope depends on $x$ and $y$: $-\dfrac{4}{1 + 12} = -\dfrac{4}{13}$.
7. **Write the line.** $y - 2 = -\dfrac{4}{13}(x - 1)$.

### Traps

:::: compare The missing dy/dx
::: wrong
$\dfrac{d}{dx}\left(y^3\right) = 3y^2$
:::
::: right
$y$ is the inside, so its derivative tags along: $3y^2\dfrac{dy}{dx}$
:::
::::

:::: compare Skipping the product rule
::: wrong
$\dfrac{d}{dx}\left(x^2y\right) = 2x\dfrac{dy}{dx}$
:::
::: right
Both pieces change, so it gets two terms: $2xy + x^2\dfrac{dy}{dx}$
:::
::::

:::: compare Using the tangent slope for a normal line
::: wrong
The tangent slope is $-\dfrac{3}{4}$, so the normal slope is $-\dfrac{4}{3}$.
:::
::: right
Flip it and change the sign: the normal slope is $\dfrac{4}{3}$.
:::
::::

### Try it

**Try 4.** (Multiple choice) If $x^2 - 3xy + y^2 = 1$, then $\dfrac{dy}{dx} =$

- **A.** $(2x - 3y)/(2y - 3x)$
- **B.** $(3y - 2x)/(2y)$
- **C.** $-2x/(2y - 3)$
- **D.** $(3y - 2x)/(2y - 3x)$
- **E.** $(3y - 2x)/(3x - 2y)$

::: details Steps
1. **Take the derivative of both sides.** $x^2$ gives $2x$. $3xy$ is a product, so it gives $3y + 3x\dfrac{dy}{dx}$. $y^2$ gives $2y\dfrac{dy}{dx}$. The 1 gives 0.
2. **The full line.** $2x - 3y - 3x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$.
3. **Gather and factor.** $\dfrac{dy}{dx}(2y - 3x) = 3y - 2x$.
4. **Answer: D.** Choice A has the top's sign flipped, and choice C skipped the product rule.
:::

**Try 5.** Find the normal line to $xy^2 = 18$ at the point $(2, 3)$.

::: details Steps
1. **Check the point.** $2\cdot 9 = 18$.
2. **Product rule.** $y^2 + x\cdot 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{y}{2x}$.
3. **Tangent slope.** $-\dfrac{3}{4}$ at $(2, 3)$.
4. **Normal slope.** Flip it and change the sign: $\dfrac{4}{3}$.
5. **Answer:** $y - 3 = \dfrac{4}{3}(x - 2)$.
:::

**Try 6.** For the curve $x^2 + y^2 - 4x + 2y = 4$, find every point where the tangent line is horizontal and every point where it's vertical.

::: details Steps
1. **Take the derivative of both sides.** $2x + 2y\dfrac{dy}{dx} - 4 + 2\dfrac{dy}{dx} = 0$.
2. **Solve.** $\dfrac{dy}{dx}(2y + 2) = 4 - 2x$, so $\dfrac{dy}{dx} = \dfrac{2 - x}{y + 1}$.
3. **Horizontal: the top is zero**, so $x = 2$. Plug it back in: $y^2 + 2y - 8 = 0$, so $(y + 4)(y - 2) = 0$. The points are $(2, 2)$ and $(2, -4)$.
4. **Vertical: the bottom is zero**, so $y = -1$. Plug it back in: $x^2 - 4x - 5 = 0$, so $(x - 5)(x + 1) = 0$. The points are $(5, -1)$ and $(-1, -1)$.
5. **Check none make both zero.** At each point only one of the top and bottom is zero, so each tangent really is horizontal or vertical.
:::

## Derivatives of inverse functions

### What is going on

An inverse undoes the original. If $f$ sends 0 to 1, then $f^{-1}$ (read "f inverse") sends 1 back to 0. The $-1$ means "undo," not "one over." Its graph is the original flipped across the line $y = x$, so every point $(b, a)$ on $f$ becomes $(a, b)$ on the inverse.

The flip also swaps rise and run. A slope is rise over run, so swapping them turns the slope into its reciprocal. The catch is that it has to be the slope **at the matching point**. You almost never need a formula for $f^{-1}$. You need one point and one slope.

Here's why the formula is true. Call the inverse $g$. Undoing means $f(g(x)) = x$. Take the derivative of both sides with the chain rule: $f'(g(x))\cdot g'(x) = 1$. Divide, and $g'(x) = \dfrac{1}{f'(g(x))}$.

### How to spot it

You see $f^{-1}$, $\left(f^{-1}\right)'(a)$, or "$g$ is the inverse of $f$." Usually $f$ is something you could never undo by hand, like $x + e^x$, or it's only given as a table or a tangent line.

::: note The move
Flip the point, then flip the slope.

$$\left(f^{-1}\right)'(a) = \frac{1}{f'\big(\color{teal}{b}\big)} \qquad \text{where } f(\color{teal}{b}) = a$$

1. **Find the matching input $b$.** Solve $f(b) = a$. With a formula, guess small numbers like 0, 1, $-1$ and 2. With a table, find $a$ in the $f(x)$ row or column, **not** the $x$ one.
2. **Find the original slope there**, $f'(b)$.
3. **Flip it.**

**Tangent-line version.** If the tangent to $f$ at $(b, a)$ has slope $m$, then the tangent to $f^{-1}$ at $(a, b)$ has slope $\dfrac{1}{m}$.
:::

### Worked example

**Example 3.** Let $f(x) = x + e^x$. Find $\left(f^{-1}\right)'(1)$.

1. **Find the matching input.** Which $x$ does $f$ send to 1? Try $x = 0$: $0 + e^0 = 1$. So $f^{-1}(1) = 0$.
2. **Find the original slope there.** $f'(x) = 1 + e^x$, so $f'(0) = 2$.
3. **Flip it**, because the mirror swaps rise and run. **Answer:** $\dfrac{1}{2}$.

### Traps

:::: compare Plugging a straight into f prime
::: wrong
$\left(f^{-1}\right)'(1) = \dfrac{1}{f'(1)} = \dfrac{1}{1 + e}$
:::
::: right
Find the matching input first. $f(0) = 1$, so it's $\dfrac{1}{f'(0)} = \dfrac{1}{2}$.
:::
::::

:::: compare Reading the wrong row of a table
::: wrong
Looking for $a$ in the $x$ row and using the $f'$ value under it
:::
::: right
Look for $a$ among the $f(x)$ outputs. The $f'$ value in **that** column is the one you flip.
:::
::::

:::: compare Forgetting to flip
::: wrong
$\left(f^{-1}\right)'(1) = f'(0) = 2$
:::
::: right
The mirror swaps rise and run: $\dfrac{1}{f'(0)} = \dfrac{1}{2}$
:::
::::

### Try it

**Try 7.** (Multiple choice) The table gives values of an increasing function $f$ and its derivative. What is $\left(f^{-1}\right)'(7)$?

| $x$ | 0 | 2 | 3 | 7 |
|---|---|---|---|---|
| $f(x)$ | 3 | 7 | 8 | 12 |
| $f'(x)$ | 5 | 4 | 2 | 9 |

- **A.** $1/9$
- **B.** $1/4$
- **C.** $4$
- **D.** $1/7$
- **E.** $2$

::: details Steps
1. **Find 7 among the outputs**, in the $f(x)$ row. It sits under $x = 2$, so $f^{-1}(7) = 2$.
2. **Read the slope in that column.** $f'(2) = 4$.
3. **Flip it.**
4. **Answer: B.** Choice A used the $x = 7$ column, and choice C forgot to flip.
:::

**Try 8.** Let $f(x) = x^5 + x^3 + 2$ and let $g$ be the inverse of $f$. Find $g'(0)$.

::: details Steps
1. **Matching input.** Which $x$ gives 0? Try $-1$: $-1 - 1 + 2 = 0$. So $g(0) = -1$.
2. **Original slope there.** $f'(x) = 5x^4 + 3x^2$, so $f'(-1) = 5 + 3 = 8$.
3. **Flip it.** **Answer:** $g'(0) = \dfrac{1}{8}$.
:::

**Try 9.** The line tangent to the graph of $f$ at $x = 3$ is $y = 2x - 1$. Write the line tangent to the graph of $f^{-1}$ at $x = 5$.

::: details Steps
1. **Read the point on $f$.** The tangent line touches the graph at $x = 3$, so $f(3) = 2(3) - 1 = 5$. The point is $(3, 5)$.
2. **Read the slope.** The tangent line's slope is 2, so $f'(3) = 2$.
3. **Flip the point.** The inverse goes through $(5, 3)$.
4. **Flip the slope.** $\dfrac{1}{2}$.
5. **Answer:** $y - 3 = \dfrac{1}{2}(x - 5)$.
:::

## Derivatives of inverse trig functions

### What is going on

Regular sine takes an angle and gives you a number: $\sin\left(\dfrac{\pi}{6}\right) = \dfrac{1}{2}$. **Inverse sine** runs it backwards. It takes the number and gives you the angle: $\arcsin\left(\dfrac{1}{2}\right) = \dfrac{\pi}{6}$. Read $\arcsin x$ as "the angle whose sine is $x$." Inverse cosine ($\arccos$) and inverse tangent ($\arctan$) work the same way.

Your textbook and calculator also write these as $\sin^{-1}x$, $\cos^{-1}x$ and $\tan^{-1}x$. Here the $-1$ means "inverse," **not** "one over." So $\sin^{-1}x$ is $\arcsin x$, and it is not $\dfrac{1}{\sin x}$.

Since these are inverse functions, the flip rule from 3.3 gives their derivatives. Take $y = \arcsin x$. That means $\sin y = x$. The slope of sine at angle $y$ is $\cos y$, so the slope of inverse sine is the flip, $\dfrac{1}{\cos y}$. To get that in terms of $x$, picture a right triangle with angle $y$, opposite side $x$ and hypotenuse 1. That makes $\sin y = x$. By the Pythagorean theorem the other side is $\sqrt{1 - x^2}$, so $\cos y = \sqrt{1 - x^2}$. That's where the formula comes from. On the test you just use it.

### How to spot it

You see $\arcsin$, $\arccos$, $\arctan$, or a trig function with a $-1$ up top, like $\tan^{-1}(3x)$.

::: note The formulas to memorize
$$\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1 - x^2}} \qquad \frac{d}{dx}\arctan x = \frac{1}{1 + x^2}$$

$$\frac{d}{dx}\arccos x = -\frac{1}{\sqrt{1 - x^2}}$$

Inverse cosine is inverse sine with a minus sign. Your packet also uses the other three. Each "co" version is its partner with a minus sign:

$$\frac{d}{dx}\operatorname{arcsec} x = \frac{1}{|x|\sqrt{x^2 - 1}} \qquad \frac{d}{dx}\operatorname{arccsc} x = -\frac{1}{|x|\sqrt{x^2 - 1}} \qquad \frac{d}{dx}\operatorname{arccot} x = -\frac{1}{1 + x^2}$$

Here $|x|$ means the absolute value of $x$, its size without the sign.

**With an inside.** If there's something other than plain $x$ inside, call it $u$. Put $u$ where $x$ was, then multiply by the derivative of $u$, which is written $u'$. That's the chain rule:

$$\frac{d}{dx}\arcsin(\color{teal}{u}) = \frac{\color{teal}{u'}}{\sqrt{1 - \color{teal}{u}^2}} \qquad \frac{d}{dx}\arctan(\color{teal}{u}) = \frac{\color{teal}{u'}}{1 + \color{teal}{u}^2}$$
:::

A few values you'll need for tangent lines: $\arcsin\left(\dfrac{1}{2}\right) = \dfrac{\pi}{6}$, $\arccos(0) = \dfrac{\pi}{2}$, $\arctan(1) = \dfrac{\pi}{4}$, and $\arcsin(0) = \arctan(0) = 0$. Inverse sine and inverse tangent give angles between $-\dfrac{\pi}{2}$ and $\dfrac{\pi}{2}$. Inverse cosine gives angles between $0$ and $\pi$.

### Worked examples

**Example 4.** Find $\dfrac{dy}{dx}$ for $y = \arctan(x^2)$.

1. **Spot the inside.** The inverse tangent is applied to $x^2$, not plain $x$, so $u = x^2$.
2. **Use the inverse tangent pattern with $u$.** The bottom becomes $1 + u^2 = 1 + (x^2)^2 = 1 + x^4$.
3. **Multiply by the inside's derivative**, as the chain rule says. The derivative of $x^2$ is $2x$, and it goes on top.
4. **Answer:** $\dfrac{dy}{dx} = \dfrac{2x}{1 + x^4}$.

**Example 5.** Find the tangent line to $y = \arcsin x$ at $x = \dfrac{1}{2}$.

1. **Get the point.** A line needs a point and a slope. $\arcsin\left(\dfrac{1}{2}\right) = \dfrac{\pi}{6}$, because $\sin\left(\dfrac{\pi}{6}\right) = \dfrac{1}{2}$. The point is $\left(\dfrac{1}{2}, \dfrac{\pi}{6}\right)$.
2. **Get the slope from the formula.** Plug $x = \dfrac{1}{2}$ into $\dfrac{1}{\sqrt{1 - x^2}}$. Since $1 - \dfrac{1}{4} = \dfrac{3}{4}$, the slope is $\dfrac{1}{\sqrt{3/4}} = \dfrac{2}{\sqrt{3}}$.
3. **Write the line** in point-slope form: $y - \dfrac{\pi}{6} = \dfrac{2}{\sqrt{3}}\left(x - \dfrac{1}{2}\right)$.

### Traps

:::: compare Reading the −1 as "one over"
::: wrong
$\sin^{-1}x = \dfrac{1}{\sin x}$, so its derivative is $-\dfrac{\cos x}{\sin^2 x}$
:::
::: right
$\sin^{-1}x$ means $\arcsin x$, so its derivative is $\dfrac{1}{\sqrt{1 - x^2}}$
:::
::::

:::: compare Forgetting the inside's derivative
::: wrong
$\dfrac{d}{dx}\arcsin(3x) = \dfrac{1}{\sqrt{1 - 9x^2}}$
:::
::: right
The inside $3x$ adds a factor of 3: $\dfrac{3}{\sqrt{1 - 9x^2}}$
:::
::::

:::: compare Mixing up the two formulas
::: wrong
$\dfrac{d}{dx}\arctan x = \dfrac{1}{\sqrt{1 + x^2}}$
:::
::: right
Only inverse sine and inverse cosine have a square root. Inverse tangent is $\dfrac{1}{1 + x^2}$, no root.
:::
::::

:::: compare Losing the minus sign on inverse cosine
::: wrong
$\dfrac{d}{dx}\arccos x = \dfrac{1}{\sqrt{1 - x^2}}$
:::
::: right
Every "co" version gets a minus sign: $-\dfrac{1}{\sqrt{1 - x^2}}$
:::
::::

## Choosing the right rule

### What is going on

On a unit test, the problems don't tell you which rule to use. You have to read the function and decide. Here's the trick: ask what the **last step** would be if you worked the function out on a calculator. That last step tells you the first rule to use. Then work inward, one layer at a time.

### How to decide

::: note The decision list
- **$x$ and $y$ are mixed in one equation:** implicit differentiation.
- **The problem says $f^{-1}$ or "the inverse of $f$":** flip the slope at the matching point.
- **The last step is multiplying two pieces that both have $x$:** product rule. That's (first piece's derivative)(second piece) + (first piece)(second piece's derivative).
- **The last step is dividing, with $x$ on top and bottom:** quotient rule. If the top is just a number, rewrite it as a power and use the chain rule instead.
- **The last step is applying a function (a power, root, sine, $e$, $\ln$, or an inverse trig function) to something that isn't plain $x$:** chain rule.
:::

Most test problems use two of these. That's normal. Each rule handles one layer.

### Worked example

**Example 6.** Find $\dfrac{dy}{dx}$ for $y = x^2\arctan(3x)$.

1. **Find the last step.** You'd work out $x^2$ and $\arctan(3x)$ separately, then multiply. So it's the product rule first.
2. **Derivative of the first piece.** $x^2$ gives $2x$.
3. **Derivative of the second piece.** That's the inverse tangent pattern with inside $3x$: $\dfrac{3}{1 + 9x^2}$.
4. **Put it into the product rule.** (first's derivative)(second) + (first)(second's derivative): $\dfrac{dy}{dx} = 2x\arctan(3x) + \dfrac{3x^2}{1 + 9x^2}$.

### Limits that are secretly derivatives

The review packet hides derivatives inside limits. A limit shaped like $\dfrac{f(a + h) - f(a)}{h}$ as $h$ goes to 0, or $\dfrac{f(x) - f(a)}{x - a}$ as $x$ goes to $a$, is just the slope $f'(a)$. Don't do any limit work. Name the function $f$ and the point $a$, take the derivative, and plug in. For example, $\displaystyle\lim_{x \to 1/2}\frac{\arcsin x - \arcsin(1/2)}{x - 1/2}$ is the slope of inverse sine at $\dfrac{1}{2}$, which Example 5 found: $\dfrac{2}{\sqrt{3}}$.

### Traps

:::: compare Using only the chain rule on a product
::: wrong
$\dfrac{d}{dx}\left[x\sin(x^2)\right] = x\cos(x^2)\cdot 2x$
:::
::: right
It's a product first, so it gets two terms: $\sin(x^2) + 2x^2\cos(x^2)$
:::
::::

:::: compare Dividing the derivatives
::: wrong
Dividing the derivatives: $\dfrac{d}{dx}\,\dfrac{4}{1 + x^2} = \dfrac{0}{2x} = 0$
:::
::: right
The quotient rule works, but it does not mean dividing the derivatives. A shorter option is to rewrite it as $4(1 + x^2)^{-1}$. The chain rule gives $-\dfrac{8x}{(1 + x^2)^2}$ in one line.
:::
::::

## Second derivatives

### What is going on

The first derivative tells you the slope. The **second derivative** is the derivative of the derivative. It tells you how fast the slope itself is changing. You find it by taking the derivative twice, using whatever rules each step needs.

Here's how to write it. If the function is $f(x)$, the second derivative is $f''(x)$, read "f double prime." If it's $y$, the second derivative is $y''$ or $\dfrac{d^2y}{dx^2}$, read "d two y, d x squared." The third derivative is $f'''(x)$. Past that, the count goes in parentheses: $f^{(4)}(x)$ is the fourth derivative, not a power.

### How to spot it

You see two or more prime marks, $\dfrac{d^2y}{dx^2}$, or "second derivative."

::: note The move
Find the first derivative and simplify it. Then take the derivative of that answer. The first derivative is usually a product or a fraction, so the second round often needs the product or quotient rule even when the first round didn't.
:::

### Worked example

**Example 7.** Find $f''(x)$ for $f(x) = e^{x^2}$.

1. **First derivative.** It's $e$ with an inside of $x^2$. $e$ copies itself, then you multiply by the inside's derivative: $f'(x) = 2x\,e^{x^2}$.
2. **Look at what you got.** $2x\,e^{x^2}$ is a product of two pieces with $x$, so the second round uses the product rule.
3. **Product rule.** The derivative of $2x$ is 2, and the derivative of $e^{x^2}$ is $2x\,e^{x^2}$ again: $f''(x) = 2e^{x^2} + 2x\cdot 2x\,e^{x^2}$.
4. **Clean up.** $f''(x) = 2e^{x^2} + 4x^2e^{x^2}$, or factored, $(2 + 4x^2)e^{x^2}$.

### Patterns and motion

**Repeating patterns.** Sine and cosine cycle every four derivatives. Starting from $\sin x$, you get $\cos x$, then $-\sin x$, then $-\cos x$, then back to $\sin x$. For a big one like the 27th derivative, divide by 4 and keep the remainder. 27 is six full cycles with 3 left over, so it's the same as the 3rd derivative, $-\cos x$.

**Motion.** If $s(t)$ is an object's position at time $t$, then its first derivative $v(t) = s'(t)$ is the **velocity** (how fast the position changes), and its second derivative $a(t) = s''(t)$ is the **acceleration** (how fast the velocity changes). The third derivative is called **jerk**. The object is **speeding up** when velocity and acceleration have the same sign, and **slowing down** when their signs are opposite.

## Implicit second derivatives

### What is going on

This move combines the chain rule with taking a derivative twice. You already know how to get $\dfrac{dy}{dx}$ from an equation like $x^2 + y^2 = 25$. The answer has both $x$ and $y$ in it. To get the second derivative, take the derivative of that answer.

There are two things to remember. First, $y$ is still a hidden function of $x$, so every $y$ that gets a derivative picks up a $\dfrac{dy}{dx}$ again. Second, the new answer will have $\dfrac{dy}{dx}$ in it. You already know what $\dfrac{dy}{dx}$ equals, so you **swap it in**. That leaves an answer with only $x$ and $y$. Often the original equation lets you simplify one more step.

### How to spot it

An equation with $x$ and $y$ mixed, plus the words "second derivative" or $\dfrac{d^2y}{dx^2}$.

::: note The move
1. Find $\dfrac{dy}{dx}$ as usual.
2. Take the derivative of that answer. It's usually a fraction, so use the quotient rule. Write $\dfrac{dy}{dx}$ wherever $y$ gets a derivative.
3. Swap in your formula for $\dfrac{dy}{dx}$.
4. Simplify, and use the original equation if part of it shows up.

If you only need the value at one point, you can plug in numbers as soon as you have them. That's usually faster.
:::

### Worked examples

**Example 8.** For the circle $x^2 + y^2 = 25$, find $\dfrac{d^2y}{dx^2}$.

1. **First derivative.** Taking the derivative of both sides gives $2x + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{x}{y}$.
2. **Take the derivative of $-\dfrac{x}{y}$.** It's a fraction, so use the quotient rule: (bottom)(top's derivative) minus (top)(bottom's derivative), all over bottom squared. The top $x$ has derivative 1. The bottom $y$ has derivative $\dfrac{dy}{dx}$. That gives $\dfrac{d^2y}{dx^2} = -\dfrac{y - x\dfrac{dy}{dx}}{y^2}$.
3. **Swap in** $\dfrac{dy}{dx} = -\dfrac{x}{y}$, since you already know it: $-\dfrac{y + \dfrac{x^2}{y}}{y^2}$.
4. **Clear the small fraction.** Multiply top and bottom by $y$: $-\dfrac{y^2 + x^2}{y^3}$.
5. **Use the original equation.** $x^2 + y^2$ is 25, so $\dfrac{d^2y}{dx^2} = -\dfrac{25}{y^3}$.

**Example 9.** For $x^2 + xy + y^2 = 7$, find $\dfrac{d^2y}{dx^2}$ at the point $(1, 2)$.

1. **First derivative, then plug in.** Taking the derivative of both sides gives $2x + y + x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0$, with the product rule on $xy$. At $(1, 2)$ that's $4 + 5\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{4}{5}$.
2. **Take the derivative of the whole line again.** You only need the value at one point, so skip the fraction and work with this line. $2x$ gives 2. $y$ gives $\dfrac{dy}{dx}$. $x\dfrac{dy}{dx}$ is a product, so it gives $\dfrac{dy}{dx} + x\dfrac{d^2y}{dx^2}$. $2y\dfrac{dy}{dx}$ is also a product, so it gives $2\left(\dfrac{dy}{dx}\right)^2 + 2y\dfrac{d^2y}{dx^2}$.
3. **Plug in everything you know**: $x = 1$, $y = 2$ and $\dfrac{dy}{dx} = -\dfrac{4}{5}$. The terms without a second derivative add up to $2 - \dfrac{8}{5} + \dfrac{32}{25} = \dfrac{42}{25}$. The second-derivative terms are $(1 + 4)\dfrac{d^2y}{dx^2}$. So the line says $\dfrac{42}{25} + 5\dfrac{d^2y}{dx^2} = 0$.
4. **Solve.** $\dfrac{d^2y}{dx^2} = -\dfrac{42}{125}$.

### Traps

:::: compare Dropping the dy/dx in the second round
::: wrong
In Example 8, treating the bottom $y$ like a constant: $\dfrac{d^2y}{dx^2} = -\dfrac{1}{y}$
:::
::: right
$y$ still changes with $x$, so its derivative is $\dfrac{dy}{dx}$: $-\dfrac{y - x\dfrac{dy}{dx}}{y^2}$
:::
::::

:::: compare Stopping before the swap
::: wrong
Leaving the answer as $-\dfrac{y - x\dfrac{dy}{dx}}{y^2}$
:::
::: right
Swap in $\dfrac{dy}{dx} = -\dfrac{x}{y}$ and simplify to $-\dfrac{25}{y^3}$. It isn't done until $\dfrac{dy}{dx}$ is gone.
:::
::::

:::: compare Squaring the first derivative
::: wrong
$f''(x) = \big(f'(x)\big)^2$
:::
::: right
The second derivative is the derivative of $f'(x)$. You take it again, you don't square it.
:::
::::

## Quick summary

::: takeaways
- **Chain rule:** outside's derivative with the inside untouched, times the inside's derivative. With given values, find the inside's value first.
- **Implicit:** $y$ is a hidden inside, so every $y$ term brings a $\dfrac{dy}{dx}$. A zero top means horizontal, a zero bottom means vertical, and a normal line uses the negative reciprocal slope.
- **Inverse function:** find the matching input $b$ with $f(b) = a$, then flip $f'(b)$.
- **Inverse trig:** inverse sine is $\dfrac{1}{\sqrt{1 - x^2}}$, inverse tangent is $\dfrac{1}{1 + x^2}$, and inverse cosine is inverse sine with a minus sign. With an inside, put it where $x$ was and multiply by its derivative.
- **Choosing a rule:** the last step names the first rule. Work inward one layer at a time. A limit shaped like a slope is just a derivative.
- **Second derivative:** the derivative of the derivative. The second round usually needs the product or quotient rule. Sine and cosine repeat every four derivatives. For motion, velocity is $s'$ and acceleration is $s''$. Same signs means speeding up.
- **Implicit second derivative:** take the derivative of $\dfrac{dy}{dx}$, attach $\dfrac{dy}{dx}$ to every $y$ term, swap in the formula you found, then simplify with the original equation.
:::

## Practice test

These match the problem types in your Unit 3 packet. No calculator. Try each one, then tap to see the steps.

**1.** (Multiple choice) $\dfrac{d}{dx}\arcsin(3x) =$

- **A.** $3/\sqrt{1 - 9x^2}$
- **B.** $1/\sqrt{1 - 9x^2}$
- **C.** $3/\sqrt{1 - 3x^2}$
- **D.** $3/(1 + 9x^2)$
- **E.** $-3/\sqrt{1 - 9x^2}$

::: details Steps
1. **Inside is $3x$.** Put it where $x$ was: the bottom is $\sqrt{1 - (3x)^2} = \sqrt{1 - 9x^2}$.
2. **Multiply by the inside's derivative**, which is 3.
3. **Answer: A.** Choice B forgot the 3, choice D used the inverse tangent formula, and choice E is inverse cosine.
:::

**2.** (Multiple choice) Use the table. If $h(x) = f(g(x))$, then $h'(3) =$

| $x$ | $f(x)$ | $f'(x)$ | $g(x)$ | $g'(x)$ |
|---|---|---|---|---|
| 1 | 2 | $-2$ | 3 | 6 |
| 3 | 4 | 5 | 1 | 4 |

- **A.** $20$
- **B.** $-2$
- **C.** $4$
- **D.** $-8$
- **E.** $-12$

::: details Steps
1. **Write the rule.** $h'(3) = f'(g(3))\cdot g'(3)$.
2. **Inside first.** The table says $g(3) = 1$.
3. **Outside slope at that value.** $f'(1) = -2$.
4. **Multiply by the inside slope.** $g'(3) = 4$, so $h'(3) = -2\cdot 4 = -8$.
5. **Answer: D.** Choice A is the trap $f'(3)\cdot g'(3)$.
:::

**3.** (Multiple choice) If $g(x) = \big(\arctan(2x)\big)^3$, then $g'(x) =$

- **A.** $3\big(\arctan(2x)\big)^2/(1 + 4x^2)$
- **B.** $6\big(\arctan(2x)\big)^2/(1 + 4x^2)$
- **C.** $6\big(\arctan(2x)\big)^2/(1 + 2x^2)$
- **D.** $6\arctan(2x)/(1 + 4x^2)$
- **E.** $6\big(\arctan(2x)\big)^2/\sqrt{1 - 4x^2}$

::: details Steps
1. **Three layers.** From the outside in: cubing, then inverse tangent, then $2x$.
2. **Cube layer.** $3\big(\arctan(2x)\big)^2$, with the inside left alone.
3. **Inverse tangent layer.** $\dfrac{1}{1 + (2x)^2} = \dfrac{1}{1 + 4x^2}$.
4. **Last layer.** $2x$ gives 2. Multiply all three.
5. **Answer: B.** Choice A stopped one layer early.
:::

**4.** (Multiple choice) For $x > 1$, $\dfrac{d}{dx}\operatorname{arcsec}(x^3) =$

- **A.** $3/(x\sqrt{x^6 - 1})$
- **B.** $1/(x^3\sqrt{x^6 - 1})$
- **C.** $3x^2/\sqrt{x^6 - 1}$
- **D.** $-3/(x\sqrt{x^6 - 1})$
- **E.** $3/(x\sqrt{1 - x^6})$

::: details Steps
1. **Inverse secant pattern with inside $x^3$.** $\dfrac{1}{|x^3|\sqrt{(x^3)^2 - 1}}$. Since $x > 1$, $|x^3| = x^3$.
2. **Multiply by the inside's derivative**, $3x^2$: $\dfrac{3x^2}{x^3\sqrt{x^6 - 1}}$.
3. **Cancel $x^2$** from top and bottom.
4. **Answer: A.** Choice B forgot the inside's derivative, and choice D is inverse cosecant.
:::

**5.** (Multiple choice) If $y = x\arctan x$, then $\dfrac{dy}{dx}$ at $x = 1$ is

- **A.** $\pi/4$
- **B.** $1/2$
- **C.** $\pi/4 + 1/2$
- **D.** $\pi/4 + 1$
- **E.** $1$

::: details Steps
1. **Last step is multiplying**, so use the product rule: $\dfrac{dy}{dx} = \arctan x + \dfrac{x}{1 + x^2}$.
2. **Plug in 1.** $\arctan 1 = \dfrac{\pi}{4}$, and $\dfrac{1}{1 + 1} = \dfrac{1}{2}$.
3. **Answer: C.** Choice A drops the second product-rule term.
:::

**6.** (Multiple choice) If $\arctan y = x^2$, then $\dfrac{dy}{dx} =$

- **A.** $2x/(1 + y^2)$
- **B.** $2x(1 + y^2)$
- **C.** $2x$
- **D.** $(1 + y^2)/(2x)$
- **E.** $2xy$

::: details Steps
1. **$x$ and $y$ are mixed, so go implicit.** The left side is inverse tangent of $y$, so its derivative is $\dfrac{1}{1 + y^2}\cdot\dfrac{dy}{dx}$, with the tag-along because $y$ is the inside.
2. **Right side.** $x^2$ gives $2x$.
3. **Solve.** Multiply both sides by $1 + y^2$.
4. **Answer: B.** Choice A divided instead of multiplied.
:::

**7.** (Multiple choice) $\displaystyle\lim_{h \to 0}\frac{\arctan(1 + h) - \arctan(1)}{h} =$

- **A.** $0$
- **B.** $\pi/4$
- **C.** $1/2$
- **D.** $1$
- **E.** nonexistent

::: details Steps
1. **Spot the disguise.** This is the slope of $f(x) = \arctan x$ at $a = 1$.
2. **Take the derivative.** $\dfrac{1}{1 + x^2}$.
3. **Plug in 1.** $\dfrac{1}{2}$.
4. **Answer: C.** Choice B is $\arctan 1$, the value instead of the slope.
:::

**8.** (Multiple choice) If $x^3 + y^3 = 8$, then $\dfrac{d^2y}{dx^2} =$

- **A.** $-2x/y^2$
- **B.** $-x^2/y^2$
- **C.** $16x/y^5$
- **D.** $-16x^2/y^5$
- **E.** $-16x/y^5$

::: details Steps
1. **First derivative.** $3x^2 + 3y^2\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{x^2}{y^2}$.
2. **Quotient rule on $-\dfrac{x^2}{y^2}$.** The top's derivative is $2x$. The bottom's is $2y\dfrac{dy}{dx}$. That gives $-\dfrac{2xy^2 - 2x^2y\dfrac{dy}{dx}}{y^4}$.
3. **Swap in** $\dfrac{dy}{dx} = -\dfrac{x^2}{y^2}$. The top becomes $2xy^2 + \dfrac{2x^4}{y}$.
4. **Clear the small fraction.** Multiply top and bottom by $y$: $-\dfrac{2xy^3 + 2x^4}{y^5} = -\dfrac{2x(y^3 + x^3)}{y^5}$.
5. **Use the original equation.** $x^3 + y^3 = 8$, so it's $-\dfrac{16x}{y^5}$.
6. **Answer: E.** Choice B is the first derivative.
:::

**9.** (Multiple choice) Let $f(x) = x^5 + 2x - 1$ and let $g$ be the inverse of $f$. Then $g'(2) =$

- **A.** $1/7$
- **B.** $7$
- **C.** $1/82$
- **D.** $1/2$
- **E.** $-1/7$

::: details Steps
1. **Matching point.** Which input gives 2? Try 1: $1 + 2 - 1 = 2$. So $g(2) = 1$.
2. **Original slope there.** $f'(x) = 5x^4 + 2$, so $f'(1) = 7$.
3. **Flip it.**
4. **Answer: A.** Choice C is the trap $\dfrac{1}{f'(2)}$, and choice B forgot to flip.
:::

**10.** Find $f''(x)$ for $f(x) = x^2\ln x$.

::: details Steps
1. **First derivative, by the product rule.** $2x\ln x + x^2\cdot\dfrac{1}{x} = 2x\ln x + x$.
2. **Second derivative.** $2x\ln x$ is another product, so it gives $2\ln x + 2$. The $x$ gives 1.
3. **Answer:** $f''(x) = 2\ln x + 3$.
:::

**11.** Find the quadratic $P(x) = ax^2 + bx + c$ with $P(0) = 2$, $P'(1) = 3$ and $P''(4) = -2$.

::: details Steps
1. **Start with the second derivative**, since it only has one unknown. $P''(x) = 2a$, so $2a = -2$ and $a = -1$.
2. **First derivative next.** $P'(x) = 2ax + b = -2x + b$. Then $P'(1) = -2 + b = 3$, so $b = 5$.
3. **Then the original.** $P(0) = c = 2$.
4. **Answer:** $P(x) = -x^2 + 5x + 2$.
:::

**12.** A particle's position, in meters after $t$ seconds, is $s(t) = t^3 - 3t^2$. Find its velocity and acceleration, and decide whether it's speeding up or slowing down at $t = \dfrac{3}{2}$.

::: details Steps
1. **Velocity is the first derivative.** $v(t) = 3t^2 - 6t$.
2. **Acceleration is the second.** $a(t) = 6t - 6$.
3. **Plug in $t = \dfrac{3}{2}$.** $v = \dfrac{27}{4} - 9 = -\dfrac{9}{4}$, which is negative. $a = 9 - 6 = 3$, which is positive.
4. **Compare signs.** They're opposite, so the particle is **slowing down**.
:::

**13.** (Free response) A curve is given by $y^2 - 2xy = 3$.

**Part a.** Show that $\dfrac{dy}{dx} = \dfrac{y}{y - x}$.

**Part b.** Write the equation of the tangent line at the point $(1, 3)$.

**Part c.** Is there any point on the curve where the tangent line is horizontal? Explain.

**Part d.** Find $\dfrac{d^2y}{dx^2}$ at the point $(1, 3)$.

::: details Steps for part a
1. **Take the derivative of both sides.** $y^2$ gives $2y\dfrac{dy}{dx}$. $2xy$ is a product, so it gives $2y + 2x\dfrac{dy}{dx}$. The 3 gives 0.
2. **Gather the $\dfrac{dy}{dx}$ terms.** $2y\dfrac{dy}{dx} - 2x\dfrac{dy}{dx} = 2y$, so $\dfrac{dy}{dx}(2y - 2x) = 2y$.
3. **Divide, then cancel the 2s.** $\dfrac{dy}{dx} = \dfrac{y}{y - x}$, as required.
:::

::: details Steps for part b
1. **Check the point is on the curve.** $9 - 6 = 3$. It is.
2. **Slope.** $\dfrac{3}{3 - 1} = \dfrac{3}{2}$.
3. **Answer:** $y - 3 = \dfrac{3}{2}(x - 1)$.
:::

::: details Steps for part c
1. **Horizontal means the top of $\dfrac{dy}{dx}$ is zero**, so $y = 0$.
2. **Put $y = 0$ into the curve.** $0 - 0 = 3$ is false.
3. **Answer:** No. No point on the curve has $y = 0$, so the slope is never zero.
:::

::: details Steps for part d
1. **Quotient rule on $\dfrac{y}{y - x}$.** The top's derivative is $\dfrac{dy}{dx}$. The bottom's is $\dfrac{dy}{dx} - 1$. So $\dfrac{d^2y}{dx^2} = \dfrac{(y - x)\dfrac{dy}{dx} - y\left(\dfrac{dy}{dx} - 1\right)}{(y - x)^2}$.
2. **Simplify the top.** The $y\dfrac{dy}{dx}$ terms cancel, which leaves $\dfrac{y - x\dfrac{dy}{dx}}{(y - x)^2}$.
3. **Plug in** $x = 1$, $y = 3$ and $\dfrac{dy}{dx} = \dfrac{3}{2}$: $\dfrac{3 - \dfrac{3}{2}}{4} = \dfrac{3/2}{4}$.
4. **Answer:** $\dfrac{3}{8}$.
:::

## Sources

- Unit 3 class packet, *Differentiation: Composite, Implicit and Inverse Functions*, sections 3.4 to 3.6 and the review pages. The teacher did not post a test topic list; the review scope is inferred from the packet.
- College Board, *AP Calculus AB and BC Course and Exam Description*, Unit 3: Differentiation: Composite, Implicit, and Inverse Functions. [apcentral.collegeboard.org](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [[calc-3-1-3-3-quiz|Calc Quiz: Chain Rule, Implicit, Inverses]], this wiki's page for sections 3.1 to 3.3.
