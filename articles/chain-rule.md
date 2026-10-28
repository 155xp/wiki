---
title: Chain rule
description: The rule for differentiating a composite function, such as sin(x²) or (3x + 1)⁵, by multiplying the derivative of the outer function by the derivative of the inner one.
updated: 2026-10-28
infobox:
  title: Chain rule
  Field: Differential calculus
  Statement: "$(f \\circ g)'(x) = f'(g(x))\\,g'(x)$"
  Notation: "Leibniz: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$; Lagrange: $f'(g(x))\\,g'(x)$"
  Origin: Gottfried Wilhelm Leibniz (1676); used implicitly in l'Hôpital's *Analyse des infiniment petits* (1696)
  Generalizations: Multivariable chain rule, Faà di Bruno's formula
---

In [[differential calculus]], the **chain rule** is a formula for the [[derivative]] of a [[function composition|composite function]]: a function built by feeding the output of one function into another. If $h(x) = f(g(x))$, the chain rule says that $h'(x) = f'(g(x))\,g'(x)$, the derivative of the outer function evaluated at the inner function, times the derivative of the inner function.[^openstax][^wikipedia]

The rule is one of the core differentiation techniques taught in introductory calculus, alongside the [[power rule]], [[product rule]] and [[quotient rule]], and it is part of the AP Calculus AB course.[^apcentral] It lets a student differentiate expressions such as $\sin(x^2)$, $(3x+1)^5$ or $e^{\cos x}$ without expanding them or returning to the limit definition of the derivative.[^pauls]

The chain rule seems to have first been used by Gottfried Wilhelm Leibniz in a 1676 memoir, and its usual notation is due to him.[^wikipedia][^rodriguez] Guillaume de l'Hôpital used it implicitly in *Analyse des infiniment petits pour l'intelligence des lignes courbes* (1696), the first textbook of Leibniz's differential calculus.[^wikipedia][^analyse]

## Intuition

A derivative is a rate of change. When one quantity depends on a second, which in turn depends on a third, the rates multiply. If $y$ changes 3 times as fast as $u$, and $u$ changes 2 times as fast as $x$, then $y$ changes $3 \times 2 = 6$ times as fast as $x$.[^openstax]

Thinking of a composite function as an "outer" function wrapped around an "inner" one gives the working rule used in practice: differentiate the outside, leave the inside alone, then multiply by the derivative of the inside.[^pauls]

## Formal statement

Let $g$ be differentiable at $x$ and let $f$ be differentiable at $g(x)$. Then the composite function $h = f \circ g$, defined by $h(x) = f(g(x))$, is differentiable at $x$.[^openstax]

### Lagrange notation

In prime (Lagrange) notation the rule reads

$$
(f \circ g)'(x) = f'\big(g(x)\big)\cdot g'(x).
$$

The outer derivative $f'$ is evaluated at the inner function $g(x)$, not at $x$.[^openstax][^wikipedia]

### Leibniz notation

If $y = f(u)$ and $u = g(x)$, the rule is written

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}.
$$

The notation suggests that the $du$ terms "cancel" like fractions. That is a useful memory aid, but derivatives are not fractions, and the proof does not rely on cancellation.[^wikipedia][^rodriguez]

### Repeated composition

For three or more nested functions the rule is applied repeatedly, one layer at a time. For $y = f(g(k(x)))$,[^openstax]

$$
\frac{d}{dx}\,f\Big(g\big(k(x)\big)\Big) = f'\Big(g\big(k(x)\big)\Big)\cdot g'\big(k(x)\big)\cdot k'(x).
$$

## Worked examples

### Example 1: sin(x²)

Let $y = \sin(x^2)$. The outer function is $\sin u$ and the inner function is $u = x^2$.

1. Derivative of the outer function: $\dfrac{d}{du}\sin u = \cos u$.
2. Derivative of the inner function: $\dfrac{du}{dx} = 2x$.
3. Multiply, and substitute $u = x^2$ back in:

$$
\frac{dy}{dx} = \cos(x^2)\cdot 2x = 2x\cos(x^2).
$$

### Example 2: (3x + 1)⁵

Let $y = (3x+1)^5$. The outer function is $u^5$ and the inner function is $u = 3x + 1$.

1. Outer: $\dfrac{d}{du}u^5 = 5u^4$.
2. Inner: $\dfrac{du}{dx} = 3$.
3. Multiply:

$$
\frac{dy}{dx} = 5(3x+1)^4\cdot 3 = 15(3x+1)^4.
$$

Expanding $(3x+1)^5$ first and using the power rule term by term gives the same answer with far more work.

### Example 3: e^(cos x)

Let $y = e^{\cos x}$. The outer function is $e^u$ and the inner function is $u = \cos x$.

1. Outer: $\dfrac{d}{du}e^u = e^u$.
2. Inner: $\dfrac{du}{dx} = -\sin x$.
3. Multiply:

$$
\frac{dy}{dx} = e^{\cos x}\cdot(-\sin x) = -\sin x\,e^{\cos x}.
$$

### Example 4: a triple composition

Let $y = \sqrt{\sin(4x)}$, which is three functions nested: $\sqrt{v}$, $v = \sin w$ and $w = 4x$. Working from the outside in,

$$
\frac{dy}{dx} = \frac{1}{2\sqrt{\sin(4x)}}\cdot\cos(4x)\cdot 4 = \frac{2\cos(4x)}{\sqrt{\sin(4x)}}.
$$

## Common mistakes

- **Forgetting the inner derivative.** Writing $\dfrac{d}{dx}\sin(x^2) = \cos(x^2)$ drops the factor $2x$.[^pauls]
- **Evaluating the outer derivative at the wrong place.** In $f'(g(x))$, the outer derivative is evaluated at $g(x)$. Writing $\cos(x)\cdot 2x$ for the derivative of $\sin(x^2)$ uses $f'(x)$ instead.[^openstax]
- **Changing the inside while differentiating the outside.** Writing $\dfrac{d}{dx}(3x+1)^5 = 5(3)^4$ is wrong. The inside stays as it is in the outer derivative, and its derivative appears only as the separate factor.[^pauls]
- **Confusing composition with multiplication.** The chain rule applies to $f(g(x))$. A product $f(x)\,g(x)$ needs the [[product rule]] instead.[^wikipedia]
- **Stopping one layer early.** In nested functions every layer contributes a factor. In Example 4, leaving out the $4$ from $w = 4x$ is a typical slip.[^openstax]

## Generalizations

### Multivariable chain rule

If $z = f(x, y)$ where $x = g(t)$ and $y = h(t)$, then $z$ depends on $t$ through both $x$ and $y$, and the contributions add:[^pauls3]

$$
\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}.
$$

More generally, the derivative of a composition of functions of several variables is the product of their [[Jacobian matrix|Jacobian matrices]].[^wikipedia]

### Higher derivatives

Differentiating a composite function twice uses the chain rule together with the product rule:[^wikipedia]

$$
\frac{d^2}{dx^2}f\big(g(x)\big) = f''\big(g(x)\big)\,g'(x)^2 + f'\big(g(x)\big)\,g''(x).
$$

[[Faà di Bruno's formula]] gives the $n$th derivative of a composite function in general.[^faadibruno]

## Glossary

- **Composite function:** a function $f \circ g$ formed by applying $g$ first and then $f$ to the result, $(f \circ g)(x) = f(g(x))$.
- **Inner function:** the function applied first, $g$ in $f(g(x))$.
- **Outer function:** the function applied last, $f$ in $f(g(x))$.
- **Leibniz notation:** writing derivatives as ratios of differentials, such as $\dfrac{dy}{dx}$.
- **Lagrange notation:** writing derivatives with primes, such as $f'(x)$.
- **Differentiable:** having a derivative at a point. The chain rule requires $g$ to be differentiable at $x$ and $f$ at $g(x)$.

## See also

- [[Derivative]]
- [[Product rule]]
- [[Implicit differentiation]]
- [[Integration by substitution]]

[^openstax]: Strang, G.; Herman, E. (2016). "3.6 The Chain Rule". *Calculus Volume 1*. OpenStax. [openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule](https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule).
[^wikipedia]: "Chain rule". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org/wiki/Chain_rule](https://en.wikipedia.org/wiki/Chain_rule).
[^pauls]: Dawkins, P. "Chain Rule". *Paul's Online Math Notes: Calculus I*. Lamar University. [tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx](https://tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx).
[^pauls3]: Dawkins, P. "Chain Rule". *Paul's Online Math Notes: Calculus III*. Lamar University. [tutorial.math.lamar.edu/Classes/CalcIII/ChainRule.aspx](https://tutorial.math.lamar.edu/Classes/CalcIII/ChainRule.aspx).
[^rodriguez]: Rodríguez, O. H.; López Fernández, J. M. (2010). "A Semiotic Reflection on the Didactics of the Chain Rule". *The Mathematics Enthusiast*. 7 (2): 321–332. [scholarworks.umt.edu/tme/vol7/iss2/10](https://scholarworks.umt.edu/tme/vol7/iss2/10/).
[^analyse]: "Analyse des infiniment petits pour l'intelligence des lignes courbes". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org](https://en.wikipedia.org/wiki/Analyse_des_infiniment_petits_pour_l%27intelligence_des_lignes_courbes). Scan of the 1716 edition: [archive.org/details/infinimentpetits1716lhos00uoft](https://archive.org/details/infinimentpetits1716lhos00uoft).
[^faadibruno]: "Faà di Bruno's formula". *Wikipedia*. Retrieved 28 October 2026. [en.wikipedia.org/wiki/Faà_di_Bruno's_formula](https://en.wikipedia.org/wiki/Fa%C3%A0_di_Bruno%27s_formula).
[^apcentral]: "AP Calculus AB". *AP Central*. College Board. [apcentral.collegeboard.org/courses/ap-calculus-ab](https://apcentral.collegeboard.org/courses/ap-calculus-ab).
