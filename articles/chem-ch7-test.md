---
visibility: public
title: "Chem Test: Atomic Structure and Periodicity"
description: Study page for the AP Chemistry Chapter 7 test on atomic structure, periodic trends, PES and mass spec.
updated: 2026-11-03
infobox:
  title: Test cheat sheet
  Test: Monday, November 9, 2026, 8:00am
  Covers: Zumdahl Chapter 7
  Core idea: "$F \\propto \\frac{q_1 q_2}{r^2}$"
  Ions: Cations lose 4s before 3d
  Trends: "Up and right: smaller, higher IE, higher EN"
  May be on the test: Formal charge (Chapter 8)
---

Nearly every question is one idea: **an electron is held tighter when it feels more positive charge and sits closer to the nucleus.**

## Light and the hydrogen spectrum

### What is going on

Light comes in packets called photons, and shorter wavelength means a bigger packet. In the photoelectric effect, one photon frees one electron only if that photon alone has enough energy.

Hydrogen glows in only a few sharp colors, so its electron has fixed energy levels. A drop emits a photon equal to the gap. Bohr's formula fits one-electron atoms only.

::: note The move
$$E = \frac{hc}{\lambda} \qquad E_n = -2.178\times10^{-18}\,\text{J}\left(\frac{Z^2}{n^2}\right)$$

Use meters. $E$ is per photon.
:::

### Worked example

**Example 1.** Find the wavelength hydrogen emits dropping from $n = 4$ to $n = 2$.

1. **Find the gap.** $\Delta E = -2.178\times10^{-18}\left(\frac{1}{4} - \frac{1}{16}\right) = -4.08\times10^{-19}$ J, negative because light leaves.
2. **Photon = gap:** $\lambda = \dfrac{hc}{4.08\times10^{-19}} = 4.86\times10^{-7}$ m, or 486 nm.

### Traps

:::: compare Brightness beats the threshold
::: wrong
Bright enough red light ejects electrons.
:::
::: right
Brighter means more photons, not stronger ones.
:::
::::

:::: compare Long wavelength means more energy
::: wrong
A 700 nm photon beats a 400 nm one.
:::
::: right
$E$ goes as $\dfrac{1}{\lambda}$, so 400 nm wins.
:::
::::

## Quantum numbers and orbitals

### What is going on

An orbital is a region where an electron is likely to be, not an orbit. Four quantum numbers give its address: shell $n$, subshell $\ell$ (0 to $n - 1$; s, p, d, f), orbital $m_\ell$ ($-\ell$ to $+\ell$), and spin $m_s$ ($\pm\tfrac12$). Each orbital holds 2 electrons.

### Worked example

**Example 2.** Is $(n, \ell, m_\ell, m_s) = (2, 2, 1, +\tfrac12)$ allowed?

1. **Check $\ell$.** It only goes up to $n - 1 = 1$.
2. **So no.** That would be a 2d orbital.

### Traps

:::: compare A p subshell holds 3 electrons
::: wrong
p has 3 orbitals, so 3 electrons.
:::
::: right
3 orbitals with 2 electrons each gives 6.
:::
::::

:::: compare Inventing 1p
::: wrong
$n = 1$ has a p subshell.
:::
::: right
$\ell < n$, so the first p is 2p.
:::
::::

## Electron configurations

### What is going on

Electrons fill the lowest-energy spots first: 1s 2s 2p 3s 3p 4s 3d 4p, one per orbital before pairing (Hund). Two twists: Cr and Cu move a 4s electron into 3d, because a half-full or full d set is extra stable. And cations lose 4s **before** 3d, because 4s is the outermost shell.

### Worked example

**Example 3.** Write Fe$^{3+}$.

1. **Neutral Fe** has 26 electrons: [Ar] 4s$^2$ 3d$^6$.
2. **Remove 4s first**, the highest $n$: [Ar] 3d$^6$.
3. **Then one 3d:** [Ar] 3d$^5$, all five unpaired.

### Traps

:::: compare Removing 3d first
::: wrong
Fe$^{2+}$ = [Ar] 4s$^2$ 3d$^4$
:::
::: right
4s leaves first: [Ar] 3d$^6$
:::
::::

:::: compare Missing the exceptions
::: wrong
Cr = [Ar] 4s$^2$ 3d$^4$ and Cu = [Ar] 4s$^2$ 3d$^9$
:::
::: right
Cr = [Ar] 4s$^1$ 3d$^5$ and Cu = [Ar] 4s$^1$ 3d$^{10}$
:::
::::

## Coulomb's law and effective nuclear charge

### What is going on

This drives every trend. The nucleus pulls harder with more charge and much harder up close. Core electrons cancel part of it; same-shell electrons barely do. What is left is the **effective nuclear charge**, $Z_{\text{eff}}$.

::: note The move
$$F \propto \frac{q_1 q_2}{r^2} \qquad Z_{\text{eff}} \approx \text{protons} - \text{core electrons}$$

To explain a trend, compare $Z_{\text{eff}}$ and distance, then state the attraction.
:::

### Worked example

**Example 4.** Compare valence electrons in Na, Cl and K.

1. **Na:** 11 protons minus 10 core gives about +1, in $n = 3$.
2. **Cl:** about +7, same shell, so tighter.
3. **K:** 19 minus 18 is about +1, but in $n = 4$, so looser.

### Traps

:::: compare More protons always wins
::: wrong
K holds its electron tighter than Na: more protons.
:::
::: right
An extra core shell cancels them, and $r$ is larger.
:::
::::

:::: compare The trend as the reason
::: wrong
"Cl has a higher IE because it is farther right."
:::
::: right
More protons, same shell and shielding, so stronger attraction.
:::
::::

## Atomic and ionic radius

### What is going on

**Across a period**, electrons join the same shell while $Z_{\text{eff}}$ rises, so atoms shrink. **Down a group**, each row adds a shell, so atoms grow. Cations lose their outer shell and shrink; anions add repelling electrons and swell. With equal electron counts, more protons means smaller.

### Worked example

**Example 5.** Rank O$^{2-}$, F$^-$, Na$^+$ and Mg$^{2+}$ from largest to smallest.

1. **Count electrons.** All have 10, a tie.
2. **Count protons:** 8, 9, 11, 12. More protons pull tighter.
3. **Rank:** O$^{2-}$ > F$^-$ > Na$^+$ > Mg$^{2+}$.

### Traps

:::: compare Bigger atomic number, bigger atom
::: wrong
Cl is bigger than Na.
:::
::: right
Same shell, more pull: Cl is 102 pm, Na 166 pm.
:::
::::

:::: compare Cations barely shrink
::: wrong
Na$^+$ is about the size of Na.
:::
::: right
Na$^+$ lost its whole $n = 3$ shell.
:::
::::

## Ionization energy

### What is going on

Ionization energy (IE) is the energy to remove a gaseous atom's outermost electron. Tightly held electrons cost more, so IE **rises across** and **falls down**.

**Successive IEs** grow, since fewer electrons share the protons, then jump at the first core electron, which is closer and barely shielded.

Two dips: **group 2 to 13** (Be to B, Mg to Al), where the first p electron is higher and shielded by the s pair; and **group 15 to 16** (N to O, P to S), where the first paired p electron is repelled by its partner.

### Worked example

**Example 6.** An element's IEs are 738, 1451, 7733 and 10,543 kJ/mol. Which group is it in?

1. **Find the jump.** 1451 to 7733 is over 5 times larger.
2. **Count the IEs before it.** Two come off easily, so 2 valence electrons.
3. **Group 2** (Mg).

### Traps

:::: compare IE rises smoothly across
::: wrong
Al beats Mg: more protons.
:::
::: right
Al loses a shielded 3p electron: 578 vs 738 kJ/mol.
:::
::::

:::: compare Counting past the jump
::: wrong
The jump is between IE$_2$ and IE$_3$, so 3 valence electrons.
:::
::: right
Count the IEs **before** the jump: 2.
:::
::::

## Electron affinity and electronegativity

### What is going on

**Electron affinity** is the energy change when a gaseous atom gains an electron. It generally gets more negative (more released) across a period as $Z_{\text{eff}}$ rises. Group 2, N and noble gases are near zero: the newcomer must start a new subshell or pair up. Cl ($-349$ kJ/mol) beats F ($-328$) because tiny F is crowded.

**Electronegativity** (EN) is an atom's pull on shared bonding electrons. It follows IE for the same reasons; F tops it at 3.98.

### Worked example

**Example 7.** Rank N, O and Cl by electronegativity.

1. **Same row:** O is right of N, so O > N.
2. **Close call, use values:** O 3.44, Cl 3.16, N 3.04.
3. **Rank:** O > Cl > N.

### Traps

:::: compare Chlorine is next after fluorine
::: wrong
Cl is more electronegative than O.
:::
::: right
O (3.44) beats Cl (3.16), which is a row lower.
:::
::::

:::: compare Fluorine has the most negative EA
::: wrong
F releases the most energy.
:::
::: right
Cl does; crowding in F offsets its pull.
:::
::::

## Formal charge

### What is going on

Formal charge is bookkeeping, not a real charge. In a Lewis structure an atom "owns" its lone electrons plus half of each bond; owning more than its valence electrons makes it negative, fewer makes it positive.

The best structure keeps formal charges nearest zero, since separated charge costs energy, and puts any negative charge on the more electronegative atom, which holds it best. The charges always sum to the overall charge.

::: note The move
$$\text{FC} = \text{valence} - \text{nonbonding } e^- - \tfrac12(\text{bonding } e^-)$$
:::

### Worked example

**Example 8.** Pick the best SCN$^-$ structure. Valence: S 6, C 4, N 5.

1. **[S=C=N]$^-$:** S is $6 - 4 - 2 = 0$, C is $4 - 0 - 4 = 0$, N is $5 - 4 - 2 = -1$.
2. **[S≡C–N]$^-$:** S is $6 - 2 - 3 = +1$, N is $5 - 6 - 1 = -2$. Bigger charges, so worst.
3. **[S–C≡N]$^-$:** S is $6 - 6 - 1 = -1$, N is 0. Each structure sums to $-1$.
4. **Pick [S=C=N]$^-$.** Its $-1$ is on N (EN 3.04), not S (2.58).

### Traps

:::: compare Forgetting the half
::: wrong
C in [S=C=N]$^-$ owns all 8 bonding electrons: $4 - 0 - 8 = -4$.
:::
::: right
It owns half of them: $4 - 0 - 4 = 0$.
:::
::::

:::: compare Sum to zero
::: wrong
The formal charges in SCN$^-$ add to 0.
:::
::: right
They add to $-1$, the ion's charge.
:::
::::

## Photoelectron spectroscopy (PES)

### What is going on

PES measures the energy needed to remove each electron. Each peak is one **subshell**. Height is its electron count. Position is how tightly they are held; 1s is always highest. Mrs. Cascioli's graphs usually put **high energy on the left**, often on a log scale.

### Worked example

**Example 9.** Peaks at 104, 6.84, 3.67 and 0.50 MJ/mol have heights 2 : 2 : 6 : 1. Identify the element.

1. **Label from highest energy:** 1s, 2s, 2p, 3s.
2. **Add the heights:** $2 + 2 + 6 + 1 = 11$ electrons, so sodium.
3. **Check:** 0.50 MJ/mol matches Na's first IE (496 kJ/mol).

### Traps

:::: compare Height means energy
::: wrong
The tallest peak is held most tightly.
:::
::: right
Height is electron count. Tightness is position.
:::
::::

:::: compare Same subshell, same spot
::: wrong
The 1s peaks of B and F line up.
:::
::: right
F has 9 protons vs 5, so its peaks sit at higher energy.
:::
::::

## Mass spectrometry

### What is going on

A mass spectrometer sorts atoms by mass. Each peak is an **isotope**: same protons, different neutrons. Height is abundance, so the average lands near the tallest peak.

::: note The move
$$\text{average mass} = \sum \frac{\%\text{ abundance}}{100}\times\text{isotope mass}$$
:::

### Worked example

**Example 10.** Boron is $^{10}$B (10.013 amu) and $^{11}$B (11.009 amu), averaging 10.81 amu. Find the percent $^{10}$B.

1. **Let $x$ be the $^{10}$B fraction:** $10.81 = 10.013x + 11.009(1 - x)$.
2. **Solve:** $x = \dfrac{11.009 - 10.81}{0.996} = 0.200$, so 20.0%. It fits: 10.81 is near 11.

### Traps

:::: compare Different peaks, different protons
::: wrong
A peak 4 units heavier has 4 more protons.
:::
::: right
Same element, same protons: 4 more neutrons.
:::
::::

:::: compare The Br2 middle peak
::: wrong
Br$_2$ shows two peaks, 158 and 162.
:::
::: right
158, 160 and 162; 160 is tallest since $^{79}$Br$^{81}$Br forms two ways.
:::
::::

## Practice quiz

**1.** (Multiple choice) Co$^{2+}$ is

- **A.** [Ar] 4s$^2$ 3d$^5$
- **B.** [Ar] 3d$^7$
- **C.** [Ar] 4s$^1$ 3d$^6$
- **D.** [Ar] 4s$^2$ 3d$^7$

**2.** An element's first four IEs are 578, 1817, 2745 and 11,577 kJ/mol. How many valence electrons?

**3.** (Multiple choice) PES peak heights, high to low energy, are 2 : 2 : 6 : 2 : 2. The element is

- **A.** Mg
- **B.** Si
- **C.** S
- **D.** Ne

**4.** An element is 72.2% mass 85 and 27.8% mass 87. Find its average mass and name it.

**5.** (Multiple choice) Which is most electronegative?

- **A.** Cl
- **B.** N
- **C.** O
- **D.** Br

**6.** (Multiple choice) Which hydrogen transition emits the longest wavelength?

- **A.** $n = 3$ to $n = 2$
- **B.** $n = 2$ to $n = 1$
- **C.** $n = 4$ to $n = 2$
- **D.** $n = 1$ to $n = 3$

**7.** (Multiple choice) Which OCN$^-$ structure is best?

- **A.** [O=C=N]$^-$
- **B.** [O≡C–N]$^-$
- **C.** [O–C≡N]$^-$
- **D.** All equal

## Answer key

::: details 1. Answer
**Answer: B.** Co is [Ar] 4s$^2$ 3d$^7$; both electrons leave 4s, the highest $n$.
:::

::: details 2. Answer
**Answer: 3.** The jump comes after IE$_3$, so the fourth electron is from the core (Al).
:::

::: details 3. Answer
**Answer: B.** 14 electrons (1s$^2$ 2s$^2$ 2p$^6$ 3s$^2$ 3p$^2$) is silicon.
:::

::: details 4. Answer
**Answer:** 85.6 amu, rubidium: $0.722 \times 85 + 0.278 \times 87 = 85.56$.
:::

::: details 5. Answer
**Answer: C.** O (3.44) is farthest up and right.
:::

::: details 6. Answer
**Answer: A.** Smallest emission gap, so longest wavelength (656 nm); D is absorption.
:::

::: details 7. Answer
**Answer: C.** Its only charge, $-1$, sits on O, the most electronegative atom; A puts it on N and B has $+1$ and $-2$.
:::
