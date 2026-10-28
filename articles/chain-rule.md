---
title: Chain rule
description: How to take the derivative of a function inside another function, such as sin(x²) or (3x + 1)⁵. Take the derivative of the outside, then multiply by the derivative of the inside.
updated: 2026-10-28
visibility: public
infobox:
  title: Chain rule, quick reference
  The rule: "$\\dfrac{d}{dx}f(g(x)) = f'(g(x))\\cdot g'(x)$"
  Memory phrase: Derivative of the outside, leave the inside alone, times the derivative of the inside.
  When to use it: A function sits inside another one, like a power, sine, root or exponential of something other than plain $x$.
  Tiny example: "The derivative of $(2x+1)^3$ is $3(2x+1)^2\\cdot 2$"
---

The **chain rule** tells you how to take the derivative of a function that sits inside another function, such as $\sin(x^2)$ or $(3x+1)^5$.

In one line: **take the derivative of the outside function, leave the inside alone, then multiply by the derivative of the inside.**[^openstax]

It is one of the basic differentiation rules in AP Calculus AB, alongside the power rule, product rule and quotient rule.[^apcentral]

## Intuition

A derivative is a rate: how fast one thing changes when another changes.

Suppose three quantities are linked in a chain. $y$ depends on $u$, and $u$ depends on $x$.

- $u$ changes **2 times** as fast as $x$.
- $y$ changes **3 times** as fast as $u$.

Then $y$ changes $3 \times 2 = 6$ times as fast as $x$. **When rates are chained, they multiply.** That is the whole chain rule.

Units show the same thing. Write each rate as a fraction with its units, and the middle unit cancels:

$$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$$

For example, a car that uses $\tfrac{1}{30}$ gallon per mile and drives at 60 miles per hour burns fuel at

$$\frac{\text{gallons}}{\text{hour}} = \frac{\text{gallons}}{\text{mile}}\cdot\frac{\text{miles}}{\text{hour}} = \frac{1}{30}\cdot 60 = 2 \text{ gallons per hour.}$$

Here gallons depend on miles, and miles depend on hours, so the rate of gallons per hour is the product of the two links.[^econgraphs]

Gears work the same way. If gear A turns gear B twice as fast, and gear B turns gear C three times as fast, then gear C spins six times as fast as gear A.

<figure class="diagram">
<svg viewBox="0 0 640 170" role="img" aria-labelledby="dgm-title" xmlns="http://www.w3.org/2000/svg">
<title id="dgm-title">x goes into the inner function g to give u; u goes into the outer function f to give y. The two rates du/dx and dy/du multiply to give dy/dx.</title>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g font-family="-apple-system,Segoe UI,Roboto,Arial,sans-serif" font-size="16" fill="currentColor">
<text x="40" y="74" text-anchor="middle" font-size="22" font-style="italic">x</text>
<line x1="58" y1="68" x2="128" y2="68" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<rect x="134" y="38" width="130" height="60" rx="6" style="fill:var(--inner-bg);stroke:var(--inner)" stroke-width="1.5"/>
<text x="199" y="65" text-anchor="middle" style="fill:var(--inner)" font-weight="600">inner</text>
<text x="199" y="86" text-anchor="middle" style="fill:var(--inner)" font-style="italic">u = g(x)</text>
<line x1="266" y1="68" x2="366" y2="68" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<text x="316" y="58" text-anchor="middle" font-style="italic">u</text>
<rect x="372" y="38" width="130" height="60" rx="6" style="fill:var(--outer-bg);stroke:var(--outer)" stroke-width="1.5"/>
<text x="437" y="65" text-anchor="middle" style="fill:var(--outer)" font-weight="600">outer</text>
<text x="437" y="86" text-anchor="middle" style="fill:var(--outer)" font-style="italic">y = f(u)</text>
<line x1="504" y1="68" x2="574" y2="68" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<text x="598" y="74" text-anchor="middle" font-size="22" font-style="italic">y</text>
<text x="199" y="124" text-anchor="middle" style="fill:var(--inner)">rate du/dx</text>
<text x="437" y="124" text-anchor="middle" style="fill:var(--outer)">rate dy/du</text>
<text x="320" y="158" text-anchor="middle" font-weight="600">dy/dx = (dy/du) × (du/dx)</text>
</g>
</svg>
<figcaption>A composite function as a chain. The rate through the whole chain is the product of the rates through each link.</figcaption>
</figure>

## How to use it

To differentiate $f(g(x))$:

1. **Find the outer function.** It is the last thing you would do if you were calculating the value with a calculator.
2. **Find the inner function.** It is whatever sits inside the outer function.
3. **Differentiate the outer function, leaving the inner function unchanged inside it.**
4. **Multiply by the derivative of the inner function.**
5. **Simplify**, and check whether the inner function itself has an inside. If it does, repeat.

In the examples below, the <mark class="hl-outer">outer</mark> function is marked in one color and the <mark class="hl-inner">inner</mark> function in another.

## Formal statement

If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then $f(g(x))$ is differentiable at $x$, and[^openstax]

$$
\frac{d}{dx}\,f\big(g(x)\big) = f'\big(g(x)\big)\cdot g'(x).
$$

This is **Lagrange** (prime) notation. Note that $f'$ is evaluated at $g(x)$, not at $x$.

In **Leibniz** notation, with $y = f(u)$ and $u = g(x)$:

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}.
$$

It looks as if the $du$ terms cancel. That is a good memory aid, but derivatives are not really fractions.[^wikipedia]

## Worked examples

The examples go from easy to hard.

### Example 1: (3x + 1)⁵

- Outer: ==(something)⁵==. Inner: ++3x + 1++.
- Derivative of the outer, inside left alone: $\color{orange}{5(\color{teal}{3x+1}\color{orange}{)^4}}$
- Derivative of the inner: $\color{teal}{3}$
- Multiply:

$$
\frac{d}{dx}(3x+1)^5 = \color{orange}{5(}\color{teal}{3x+1}\color{orange}{)^4}\cdot\color{teal}{3} = 15(3x+1)^4
$$

### Example 2: sin(x²)

- Outer: ==sin(something)==. Inner: ++x²++.
- Derivative of the outer: $\color{orange}{\cos(}\color{teal}{x^2}\color{orange}{)}$
- Derivative of the inner: $\color{teal}{2x}$
- Multiply:

$$
\frac{d}{dx}\sin(x^2) = \color{orange}{\cos(}\color{teal}{x^2}\color{orange}{)}\cdot\color{teal}{2x} = 2x\cos(x^2)
$$

### Example 3: eᶜᵒˢ ˣ

- Outer: ==e^(something)==. Inner: ++cos x++.
- Derivative of the outer: $\color{orange}{e^{\color{teal}{\cos x}}}$ (the exponential is its own derivative)
- Derivative of the inner: $\color{teal}{-\sin x}$
- Multiply:

$$
\frac{d}{dx}e^{\cos x} = \color{orange}{e^{\color{teal}{\cos x}}}\cdot\color{teal}{(-\sin x)} = -\sin x\, e^{\cos x}
$$

### Example 4: √(sin 4x), a chain of three

Here there are three layers: a square root, of a sine, of $4x$. Peel them from the outside in, one factor per layer.

- Layer 1, ==√(something)==: derivative $\dfrac{1}{2\sqrt{\sin 4x}}$
- Layer 2, ++sin(something)++: derivative $\cos 4x$
- Layer 3, $4x$: derivative $4$
- Multiply all three:

$$
\frac{d}{dx}\sqrt{\sin 4x} = \frac{1}{2\sqrt{\sin 4x}}\cdot\cos 4x\cdot 4 = \frac{2\cos 4x}{\sqrt{\sin 4x}}
$$

## Common mistakes

:::: compare Forgetting the inner derivative
::: wrong
$\dfrac{d}{dx}\sin(x^2) = \cos(x^2)$
:::
::: right
$\dfrac{d}{dx}\sin(x^2) = \cos(x^2)\cdot 2x$
:::
::::

:::: compare Changing the inside while differentiating the outside
::: wrong
$\dfrac{d}{dx}\sin(x^2) = \cos(2x)$
:::
::: right
The inside stays $x^2$: $\cos(x^2)\cdot 2x$
:::
::::

:::: compare Differentiating the inside instead of keeping it
::: wrong
$\dfrac{d}{dx}(3x+1)^5 = 5(3)^4$
:::
::: right
$\dfrac{d}{dx}(3x+1)^5 = 5(3x+1)^4\cdot 3$
:::
::::

:::: compare Using the chain rule on a product
::: wrong
$\dfrac{d}{dx}\big(x^2\sin x\big) = 2x\cos x$
:::
::: right
That is a product, not a function inside a function. Use the product rule: $2x\sin x + x^2\cos x$
:::
::::

:::: compare Stopping one layer early
::: wrong
$\dfrac{d}{dx}\sqrt{\sin 4x} = \dfrac{\cos 4x}{2\sqrt{\sin 4x}}$
:::
::: right
Every layer gives a factor, including the $4$ from $4x$: $\dfrac{4\cos 4x}{2\sqrt{\sin 4x}}$
:::
::::

## Practice problems

**1.** Find $\dfrac{d}{dx}(x^2+1)^3$.

::: details Solution
Outer: $(\ldots)^3$. Inner: $x^2+1$, with derivative $2x$.

$3(x^2+1)^2\cdot 2x = 6x(x^2+1)^2$
:::

**2.** Find $\dfrac{d}{dx}\cos(5x)$.

::: details Solution
Outer: $\cos(\ldots)$, with derivative $-\sin(\ldots)$. Inner: $5x$, with derivative $5$.

$-\sin(5x)\cdot 5 = -5\sin(5x)$
:::

**3.** Find $\dfrac{d}{dx}\ln(x^2+4)$.

::: details Solution
Outer: $\ln(\ldots)$, with derivative $\dfrac{1}{\ldots}$. Inner: $x^2+4$, with derivative $2x$.

$\dfrac{1}{x^2+4}\cdot 2x = \dfrac{2x}{x^2+4}$
:::

**4.** Find $\dfrac{d}{dx}\sin^2 x$. (Hint: $\sin^2 x$ means $(\sin x)^2$.)

::: details Solution
Outer: $(\ldots)^2$. Inner: $\sin x$, with derivative $\cos x$.

$2\sin x\cdot\cos x$
:::

**5.** Let $h(x) = f(g(x))$. You are told $g(2) = 3$, $g'(2) = 4$, $f'(3) = -1$ and $f'(2) = 5$. Find $h'(2)$.

::: details Solution
$h'(2) = f'(g(2))\cdot g'(2) = f'(3)\cdot 4 = -1\cdot 4 = -4$.

The value $f'(2) = 5$ is a distractor: $f'$ must be evaluated at $g(2) = 3$, not at $2$.
:::

## Key takeaways

::: takeaways
- Use the chain rule whenever one function is inside another.
- Outside first, inside left alone, then multiply by the derivative of the inside.
- In $f'(g(x))$, the outer derivative is evaluated at the inner function.
- Each layer of nesting adds one more factor.
- Leibniz form: $\dfrac{dy}{dx} = \dfrac{dy}{du}\cdot\dfrac{du}{dx}$, so rates multiply.
:::

## AP exam tips

::: tips
- **Tables of values.** Some questions give values of $f$, $g$, $f'$ and $g'$ in a table and ask for the derivative of $f(g(x))$ at a point. Find $g(a)$ first, then look up $f'$ at that value, as in practice problem 5.
- **Show the setup.** On free-response questions, write the chain-rule step, for example $f'(g(2))\cdot g'(2)$, before plugging in numbers, so the method is visible.
- **Check every layer.** Before moving on, count the layers of nesting and make sure there is one factor for each.
- **Don't over-simplify.** An unsimplified correct derivative is still correct. Spend the time on getting each factor right.
:::

The AP Calculus AB course and exam description on AP Central lists the topics covered.[^apcentral]

## Beyond AP Calculus AB

### Several variables

If $z = f(x, y)$, where $x$ and $y$ both depend on $t$, then $z$ changes with $t$ through both paths, and the two contributions add:[^pauls3]

$$
\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}
$$

### Higher derivatives

Taking the derivative of a composite function twice needs the chain rule and the product rule together.[^wikipedia] Faà di Bruno's formula gives the $n$th derivative in general.[^faadibruno]

## History

The chain rule seems to have first been used by Gottfried Wilhelm Leibniz. In a 1676 memoir he used it to find the derivative of $\sqrt{a + bz + cz^2}$, treating it as a square root of another function.[^wikipedia]

Guillaume de l'Hôpital used the rule implicitly in *Analyse des infiniment petits pour l'intelligence des lignes courbes* (1696), the first textbook of Leibniz's differential calculus.[^wikipedia][^analyse]

The first "modern" version of the rule is believed to appear in Joseph-Louis Lagrange's *Théorie des fonctions analytiques* (1797).[^wikipedia][^rodriguez]

## Glossary

- **Composite function:** one function applied to the output of another, written $f(g(x))$ or $(f \circ g)(x)$.
- **Inner function:** the function applied first, $g$ in $f(g(x))$.
- **Outer function:** the function applied last, $f$ in $f(g(x))$.
- **Leibniz notation:** derivatives written as $\dfrac{dy}{dx}$.
- **Lagrange notation:** derivatives written with primes, as in $f'(x)$.
- **Differentiable:** having a derivative at a point.

[^openstax]: Strang, G.; Herman, E. (2016). "3.6 The Chain Rule". *Calculus Volume 1*. OpenStax. [openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule](https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule).
[^wikipedia]: "Chain rule". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org/wiki/Chain_rule](https://en.wikipedia.org/wiki/Chain_rule).
[^pauls3]: Dawkins, P. "Chain Rule". *Paul's Online Math Notes: Calculus III*. Lamar University. [tutorial.math.lamar.edu/Classes/CalcIII/ChainRule.aspx](https://tutorial.math.lamar.edu/Classes/CalcIII/ChainRule.aspx).
[^rodriguez]: Rodríguez, O. H.; López Fernández, J. M. (2010). "A Semiotic Reflection on the Didactics of the Chain Rule". *The Mathematics Enthusiast*. 7 (2): 321–332. [scholarworks.umt.edu/tme/vol7/iss2/10](https://scholarworks.umt.edu/tme/vol7/iss2/10/).
[^analyse]: "Analyse des infiniment petits pour l'intelligence des lignes courbes". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org/wiki/Analyse_des_infiniment_petits_pour_l'intelligence_des_lignes_courbes](https://en.wikipedia.org/wiki/Analyse_des_infiniment_petits_pour_l%27intelligence_des_lignes_courbes). Scan of the 1716 edition: [archive.org/details/infinimentpetits1716lhos00uoft](https://archive.org/details/infinimentpetits1716lhos00uoft).
[^faadibruno]: "Faà di Bruno's formula". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org/wiki/Faà_di_Bruno's_formula](https://en.wikipedia.org/wiki/Fa%C3%A0_di_Bruno%27s_formula).
[^apcentral]: "AP Calculus AB". *AP Central*. College Board. [apcentral.collegeboard.org/courses/ap-calculus-ab](https://apcentral.collegeboard.org/courses/ap-calculus-ab).
[^econgraphs]: "The Chain Rule". *EconGraphs*. [econgraphs.org/explanations/math/multivariable_calculus/chain_rule](https://www.econgraphs.org/explanations/math/multivariable_calculus/chain_rule).
