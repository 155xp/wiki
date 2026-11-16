---
visibility: public
title: "Chem Quiz: Drawing Lewis Structures"
description: "Drawing quiz prep: Mrs. Cash's step-by-step method, formal charge, exceptions and resonance, the page 13 packet examples, speed tricks, and every molecule from the drawing lab with answers."
updated: 2026-11-11
infobox:
  title: Quiz cheat sheet
  Quiz: Monday, November 16, 2026, 8:00am EST
  Covers: Drawing Lewis structures (Zumdahl Ch 8)
  Count: "Add valence e⁻; add 1 per minus charge, remove 1 per plus"
  Outside atoms: "H and halogens 1 bond; O likes 2; N can triple"
  Formal charge: "Should have minus does have (each dot 1, each line 1)"
  Expand: "Center atom in row 3 or lower only, never C, N, O, F"
  Speed: "Aim for under a minute per structure"
---

**Quiz: Monday, November 16 at 8:00am EST.** It's a quick quiz on drawing Lewis structures, and speed matters: on the AP exam one multiple-choice question (about 1.5 minutes) can mean drawing four structures. The plan is simple. Learn one method, see it on the page 13 packet examples, then drill every molecule from the drawing lab until each takes under a minute.

The whole job in one line: **count the electrons, put single bonds in, let the outside atoms decide where extra bonds go, then use formal charge to finish.**

## Dots for atoms and simple ions

Mrs. Cash: [How to draw an electron dot diagram for an atom](https://www.youtube.com/watch?v=_uOPrUkhwlA).

Oxygen is in the 6 column, so it has **6 valence electrons**. Write O and put 6 dots around it: the first two go together on top (the s pair), then one per side before anything doubles up (the p boxes filling one at a time).

```text
 .       ..      ..     ..     ..     ..     ..     ..
 Li      Be      B.     C.    .N.    .O:    .F:    :Ne:
                        .      .      .      ..     ..
```

Ions: a positive ion lost its outer electrons, so Na$^+$ is just **[Na]$^+$** with no dots. A negative ion gained enough to fill up, so Cl$^-$ is **[Cl]$^-$ with 8 dots**.

## The step-by-step method

Here's CO$_2$, start to finish.

**Count:** C has 4, each O has 6: 4 + 6 + 6 = **16 electrons**.

**Single bonds first:** C goes in the middle. It forms the most bonds (4), and it's the "odd man out" (only one of it). O–C–O.

**Outside atoms decide the extra bonds:** oxygen likes 2 bonds, so give each O a second bond: O=C=O. Now C has 4 bonds, which is what carbon wants.

**Dots last:** each O has a double bond, so it needs 4 more dots to reach 8. Two lone pairs on each O.

```text
  ..          ..
  O  =  C  =  O
  ..          ..
```

**Check:** 2 double bonds = 8 electrons, 8 dots, 16 total. Every atom has 8, and every formal charge is 0.

That's Mrs. Cash's method. Here it is as steps:

1. **Single bonds only.** Put the atom that forms the most bonds (or the "odd man out") in the middle, and connect everything to it with single bonds.
2. **Look at the center atom.** Can it go over 8? Only if it's in row 3 or lower (never C, N, O, F). Can it have less than 8? Only if it has 2 or 3 valence electrons (Be, B).
3. **Look at the outside atoms.** H and halogens get **single bonds only**. O often takes a **double** bond. N can take a **triple** bond.
4. **Add extra bonds first, then dots, using formal charge.** Aim for the fewest charges, put any negative charge on the more electronegative atom, make the charges add to the total, and write an ion's charge outside square brackets. Show resonance if there's a choice.
5. **Make sure C, N, O and F never have more than 8.**

**Double check every time:** dots + 2 per bond line = the total you counted at the start (including the charge).

Two facts make this fast:

| Atom (neutral, no charge) | Bonds it usually makes |
|---|---|
| C | 4 |
| N, P | 3 |
| O, S | 2 |
| H, F, Cl, Br, I | 1 |

**Outside atoms always get to 8 (H gets 2).** Count the dots straight from its bonds: single bond, add 6 dots; double bond, add 4; triple bond, add 2.

Carbon almost never has dots. The only common exceptions are CO and CN$^-$, where carbon is bonded to just one atom and can't make 4 bonds any other way.

For a slower walkthrough, Mrs. Cash's suggested help video is [How to Draw Lewis Structures in an Easy Way](https://youtu.be/4ZPn8syvEv0).

### Traps

:::: compare Forgetting the charge
::: wrong
CN$^-$ has 4 + 5 = 9 electrons.
:::
::: right
It has 10. The minus charge is one extra electron.
:::
::::

:::: compare A double bond is not 2 electrons
::: wrong
O=C=O: 2 + 2 + 8 dots = 12 electrons.
:::
::: right
Each line is 2 electrons, so a double bond is 4: 4 + 4 + 8 = 16.
:::
::::

## Formal charge

Mrs. Cash: [How to calculate formal charge](https://www.youtube.com/watch?v=G0GX8_lCavQ).

Look at an oxygen with one single bond and 6 dots, like the bottom one in hydroxide. Count what it **has**: each dot counts 1, and each line counts 1 (it only owns its half of the bond). That's 6 + 1 = **7**. Oxygen **should have** 6. It has one extra, so its formal charge is **−1**.

Now an oxygen with a double bond and 4 dots: 4 + 2 = 6. That's what it should have, so **0**.

::: note The move
$$\text{FC} = \text{should have} - \text{does have} \qquad \text{does have} = \text{dots} + \text{lines}$$

More than it should have means negative; less means positive.
:::

**The best structure:**

1. Has the **fewest charges** (as close to all zeros as possible).
2. Puts a negative charge on the **more electronegative** atom (F > O > N ≈ Cl > C ≈ S > H).
3. Has formal charges that **add up to the total charge** on the structure.

Two patterns from the packet worth memorizing:

- An outside halogen with one bond and 6 dots is **0**. Giving it a double bond would make it **+1**, which a very electronegative atom won't do. That's why halogens on the outside always get one bond.
- An outside oxygen with one bond and 6 dots is **−1**. That shows up all the time in polyatomic ions.

### Worked example

**Example 1.** The packet's concept check, POCl$_3$: which structure is better? Total: 5 + 6 + 3(7) = 32 electrons. Each Cl has 3 lone pairs in both structures.

```text
Structure A                   Structure B

          ..                            ..
         :Cl:                          :Cl:
     ..   |   ..                   ..   |    ..
    :Cl - P - O:                  :Cl - P  = O:
     ..   |   ..                   ..   |
         :Cl:                          :Cl:
          ..                            ..
```

::: details Reveal the worked solution
1. **Check both counts.** A: 4 bonds (8) + O dots 6 + Cl dots 18 = 32. B: 5 lines (10) + O dots 4 + Cl dots 18 = 32.
2. **Each Cl, both structures:** 6 dots + 1 line = 7, should have 7. FC 0.
3. **A:** P has 4 lines, should have 5, so **+1**. O has 6 + 1 = 7, should have 6, so **−1**.
4. **B:** P has 5 lines, so **0**. O has 4 + 2 = 6, so **0**.
5. **B wins:** all zeros. P can hold 10 electrons because it's in row 3.
:::

### Trap

:::: compare Ions add to zero
::: wrong
The formal charges in CO$_3^{2-}$ should add to 0.
:::
::: right
They add to −2, the ion's charge.
:::
::::

## Page 13 examples

This is the packet's page 13 set: draw each one using formal charges and give its shape. Try each on paper before you reveal it.

**a.** OCl$_2$

::: details Reveal the answer
```text
   ..    ..   ..
  :Cl -  O  - Cl:
   ..    ..   ..
```

- **Count:** 6 + 2(7) = 20. **Check:** 2 bonds (4) + O dots 4 + Cl dots 12 = 20.
- **Formal charges:** all 0.
- **Shape:** 4 domains, 2 lone pairs on O: **bent**, under 109.5°.
:::

**b.** PF$_3$

::: details Reveal the answer
```text
   ..    ..    ..
  :F  -  P  -  F:
   ..    |     ..
        :F:
         ..
```

- **Count:** 5 + 3(7) = 26. **Check:** 3 bonds (6) + P dots 2 + F dots 18 = 26.
- **Formal charges:** all 0.
- **Shape:** 4 domains, 1 lone pair: **trigonal pyramidal**, about 107°.
:::

**c.** SF$_2$

::: details Reveal the answer
```text
   ..    ..    ..
  :F  -  S  -  F:
   ..    ..    ..
```

- **Count:** 6 + 2(7) = 20. **Check:** 4 + S dots 4 + F dots 12 = 20.
- **Formal charges:** all 0.
- **Shape:** 4 domains, 2 lone pairs: **bent**, under 109.5°.
:::

**d.** C$_2$H$_4$

::: details Reveal the answer
```text
  H       H
   \     /
    C = C
   /     \
  H       H
```

- **Count:** 2(4) + 4(1) = 12. **Check:** 4 C–H (8) + C=C (4) = 12, no dots.
- **Formal charges:** all 0. Each C has 4 lines.
- **Shape:** each C has 3 domains: **trigonal planar**, 120°.
:::

**e.** COBr$_2$

::: details Reveal the answer
```text
   ..          ..
  :Br  -  C  -  Br:
   ..     ||   ..
         :O:
```

- **Count:** 4 + 6 + 2(7) = 24. **Check:** 2 single (4) + double (4) + O dots 4 + Br dots 12 = 24.
- **Why the double bond goes to O:** Br is a halogen, single bonds only. O likes 2.
- **Formal charges:** all 0.
- **Shape:** 3 domains on C: **trigonal planar**, 120°.
:::

**f.** HCN

::: details Reveal the answer
```text
 H - C ≡ N:
```

- **Count:** 1 + 4 + 5 = 10. **Check:** single (2) + triple (6) + N dots 2 = 10.
- **Formal charges:** all 0.
- **Shape:** 2 domains on C: **linear**, 180°.
:::

**g.** CN$^-$

::: details Reveal the answer
```text
 [ :C ≡ N: ]-
```

- **Count:** 4 + 5 + 1 = 10. **Check:** triple (6) + 2 + 2 = 10.
- **Formal charges:** C has 2 + 3 = 5, should have 4: **−1**. N has 2 + 3 = 5: **0**. Sum −1.
- This is one of carbon's two dot exceptions: it's bonded to one atom, so the octet comes first.
- **Shape:** two atoms, so **linear**.
:::

**h.** C$_2$H$_2$

::: details Reveal the answer
```text
 H - C ≡ C - H
```

- **Count:** 2(4) + 2(1) = 10. **Check:** 2 + 6 + 2 = 10, no dots.
- **Formal charges:** all 0.
- **Shape:** each C has 2 domains: **linear**, 180°.
:::

**i.** CO

::: details Reveal the answer
```text
 :C ≡ O:
```

- **Count:** 4 + 6 = 10. **Check:** 6 + 2 + 2 = 10.
- **Formal charges:** C has 5, should have 4: **−1**. O has 5, should have 6: **+1**. Sum 0.
- The charges look bad, but it's the only way both atoms get 8. For C, the octet beats formal charge.
- **Shape:** two atoms, **linear**.
:::

**Examples: OH$^-$**

::: details Reveal the answer
```text
     ..
 [ :O - H ]-
     ..
```

- **Count:** 6 + 1 + 1 = 8. **Check:** 2 + 6 dots = 8.
- **Formal charges:** O has 6 + 1 = 7, should have 6: **−1**. H 0.
:::

**Examples: PO$_3^{3-}$**

::: details Reveal the answer
```text
   ..    ..    ..
  :O  -  P  -  O:
   ..    |     ..
        :O:
         ..
   (brackets around it, 3- outside)
```

- **Count:** 5 + 3(6) + 3 = 26. **Check:** 3 bonds (6) + P dots 2 + O dots 18 = 26.
- **Formal charges:** P has 2 + 3 = 5: **0**. Each O has 7: **−1**. Sum −3.
- **Why no double bond:** a P=O would give P 2 + 4 = 6, a −1 on P instead of O. Same number of charges, but the minus on the less electronegative atom, so it's worse.
- **Shape:** 4 domains, 1 lone pair: **trigonal pyramidal**, about 107°.
:::

**Example and note: CO$_3^{2-}$**

::: details Reveal the answer
```text
   ..          ..          ..          ..          ..          ..
   O  =  C  -  O:   <->   :O  -  C  =  O    <->   :O  -  C  -  O:
   ..    |     ..          ..    |     ..          ..    ||    ..
        :O:                     :O:                     :O:
         ..                      ..
                 (each one in brackets with 2- outside)
```

- **Count:** 4 + 3(6) + 2 = 24. **Check:** 4 lines (8) + double-bonded O 4 + two single-bonded O 12 = 24.
- **Formal charges:** C 0. Double-bonded O 0. Each single-bonded O **−1**. Sum −2.
- **Resonance:** the outside atoms are all O, so the double bond could go on any of the three. Three resonance structures, each C–O bond order 1⅓.
- **Shape:** 3 domains: **trigonal planar**, 120°.
:::

## Exceptions to the octet rule

### Less than 8: Be and B

BF$_3$: 3 + 3(7) = 24. Three B–F bonds and 6 dots on each F use all 24, and B has only **6**. Every formal charge is 0.

```text
   ..          ..
  :F  -  B  -  F:
   ..    |     ..
        :F:
         ..
```

Could one F double bond to give B its 8? That puts **+1 on F**, the most electronegative atom there is. No. Boron and beryllium usually stay short of 8 to keep their formal charges at zero.

### More than 8: center atoms in row 3 or lower

PCl$_5$ only exists if P holds 10 electrons. Atoms in row 3 or lower (P, S, Cl, Se, Br, Xe, I) have d orbitals that can join in. Row 2 atoms (C, N, O, F) can't. That's why NF$_3$ exists but NF$_5$ doesn't.

**Only the center expands.** An outside Cl still gets one bond and 6 dots. The packet's PCl$_3$ shows why: giving an outside Cl more bonds or dots either makes too many electrons or puts a +1 on a halogen.

**The outside atoms tell you whether to add double bonds:**

- **Halogens outside:** no extra bonds. Leftover electrons go on the center as dots (SF$_4$, I$_3^-$, XeF$_4$).
- **Oxygens outside:** add double bonds to the center to cut down formal charges (SO$_4^{2-}$, BrO$_3^-$, PO$_4^{3-}$).

### Worked examples

**Example 2.** The packet's SF$_4$: draw it, find the formal charge on S, the electrons around S, and the domains.

::: details Reveal the worked solution
1. **Count:** 6 + 4(7) = 34.
2. **Single bonds and outside dots:** 4 bonds (8) + 6 dots on each F (24) = 32. **2 left over go on S** as a lone pair.

```text
        F
        |
   F -  S  - F        S: 1 lone pair
        |             each F: 3 lone pairs
        F
```

3. **Formal charge (each line counts 1):** S has 2 + 4 = 6, should have 6: **0**. Each F: 0.
4. **Electrons around S (each line counts 2):** 4 × 2 + 2 = **10**, an expanded octet.
5. **Domains (each bond counts 1):** 4 bonds + 1 lone pair = 5 domains, 1 lone pair: **see-saw**.
:::

**Example 3.** The packet's BrO$_3^-$.

::: details Reveal the worked solution
1. **Count:** 7 + 3(6) + 1 = 26.
2. **Single bonds first:** 3 Br–O bonds (6) + 6 dots per O (18) = 24, and the last 2 go on Br. Formal charges: Br has 2 + 3 = 5, should have 7: **+2**. Each O **−1**. Lots of charge.
3. **Outside atoms are O, so add double bonds.** Turn two O lone pairs into Br=O bonds. Br is in row 4, so it can go past 8.

```text
   ..    ..    ..
   O  =  Br =  O
   ..    |     ..
        :O:
         ..
   (brackets, 1- outside)
```

4. **Check:** 5 lines (10) + Br dots 2 + two double-bonded O 8 + single-bonded O 6 = 26.
5. **Formal charges:** Br has 2 + 5 = 7: **0**. Double-bonded O: 0. Single-bonded O: **−1**. Sum −1.
6. **Resonance:** the single bond could be on any of the three O's: three resonance structures.
7. **Shape:** 3 bonds + 1 lone pair = 4 domains: **trigonal pyramidal**.
:::

### Odd number of electrons

NO has 5 + 6 = **11 electrons**, and you can't pair an odd number. Someone gets a single dot. Aim for the fewest formal charges, which puts it on N.

```text
  .     ..
 :N  =  O:
```

Check: double bond 4 + N dots 3 + O dots 4 = 11. N has 3 + 2 = 5: 0. O has 4 + 2 = 6: 0. NO$_2$, ClO$_2$ and O$_2^-$ are odd too.

### Traps

:::: compare Expanding a row-2 atom
::: wrong
Give N five bonds if it fixes the formal charges.
:::
::: right
C, N, O and F stop at 8. Only row 3 or lower can expand.
:::
::::

:::: compare Double bonds to a halogen
::: wrong
I$_3^-$ needs a double bond somewhere to use up electrons.
:::
::: right
Halogens outside get single bonds. Extra electrons go on the center as dots.
:::
::::

## Resonance

The packet's example is formate, HCO$_2^-$ (18 electrons). Draw it and one O gets the double bond. But why that one? Both oxygens are identical spots, so the double bond could just as well be on the other one.

```text
   ..          ..          ..          ..
   O  =  C  -  O:   <->   :O  -  C  =  O
   ..    |     ..          ..    |     ..
         H                       H
```

Real formate isn't flipping back and forth. It's a **blend (hybrid)** of the two: both C–O bonds are the same length, each oxygen carries −½, and each C–O bond order is (2 + 1) ÷ 2 = **1.5**.

- Draw every resonance structure with **double-headed arrows** between them.
- Only **electrons** move. Atoms stay put. CH$_2$Br$_2$ has no resonance; swapping the H's and Br's just rotates the molecule.
- Resonance needs a multiple bond that could sit in more than one equivalent spot.
- **Bond order** = total bonds to the repeating atoms ÷ number of spots. Carbonate: 4 bonds ÷ 3 O's = 1⅓.

## Draw it fast

You know the method. Now get each structure under a minute.

**The counting shortcut (octet-only molecules).** This is the packet's math method.

1. **Have:** total valence electrons.
2. **Need:** 8 per atom (2 per H).
3. **Shared = Need − Have.** **Bonds = Shared ÷ 2.**
4. **Dots = Have − Shared.**

CO$_2$: Have 16, Need 3 × 8 = 24, Shared 8, so **4 bonds** (two doubles) and **8 dots**. You know the answer before drawing a line. It doesn't work for exceptions (Be, B, expanded centers, odd counts); use the steps for those.

**Skeletons you'll see over and over:**

- **One atom plus a pile of outside atoms** (CCl$_4$, SF$_6$, XeF$_4$): the single atom is the center.
- **Oxyanions** (NO$_3^-$, SO$_4^{2-}$, ClO$_3^-$, PO$_4^{3-}$): the non-oxygen is the center, and the O's surround it.
- **H and halogens are always on the outside**, with one bond each.
- **Carbon chains:** carbons bond to each other in a row, with H's around them.

**Patterns to recognize on sight:**

- **10 electrons, two atoms** (N$_2$, CO, CN$^-$): triple bond, one lone pair on each end.
- **16 electrons, three atoms** (CO$_2$, CS$_2$): two double bonds.
- **24 electrons, center plus three O's or halogens** (CO$_3^{2-}$, NO$_3^-$, BF$_3$, COCl$_2$): trigonal planar. With O's on the outside, look for resonance.
- **Halogens outside a big center:** after the outside atoms are done, every leftover pair goes on the center.

**Timed drill:** set a timer for 1 minute per structure. Do the lab set below in its six groups. Draw, then reveal. Anything you missed or ran over on, redraw tomorrow without looking. Target: under 30 seconds for the basic ones, under a minute for the expanded oxyanions.

## Lab practice set

These are the species from the Drawing and Molecular Geometry Lab. OCl$_2$, PF$_3$, HCN, CN$^-$, CO, C$_2$H$_2$ and C$_2$H$_4$ are also on the lab, and they're in the page 13 set above.

In the bigger drawings, outside halogens are written without their dots so you can see the bonds. Every outside F, Cl, Br or I with one bond has **3 lone pairs**.

### Set 1: single bonds only

**1.** HF

::: details Reveal the answer
```text
      ..
  H - F:
      ..
```

- **Count:** 1 + 7 = 8. **Check:** 2 + 6 = 8. All FC 0. Two atoms: linear.
:::

**2.** Cl$_2$

::: details Reveal the answer
```text
   ..   ..
  :Cl - Cl:
   ..   ..
```

- **Count:** 2(7) = 14. **Check:** 2 + 12 = 14. All FC 0. Linear.
:::

**3.** H$_2$O

::: details Reveal the answer
```text
     ..
 H - O - H
     ..
```

- **Count:** 2(1) + 6 = 8. **Check:** 4 + 4 = 8. All FC 0.
- **Shape:** 4 domains, 2 lone pairs: **bent**, 104.5°.
:::

**4.** NH$_3$

::: details Reveal the answer
```text
      ..
  H - N - H
      |
      H
```

- **Count:** 5 + 3(1) = 8. **Check:** 6 + 2 = 8. All FC 0.
- **Shape:** 4 domains, 1 lone pair: **trigonal pyramidal**, 107°.
:::

**5.** NH$_4^+$

::: details Reveal the answer
```text
        H
        |
   [ H - N - H ]+
        |
        H
```

- **Count:** 5 + 4(1) − 1 = 8. **Check:** 4 bonds = 8, no dots.
- **Formal charges:** N has 4 lines, should have 5: **+1**. Each H 0. Sum +1.
- **Shape:** **tetrahedral**, 109.5°.
:::

**6.** CCl$_4$

::: details Reveal the answer
```text
        Cl
        |
   Cl - C - Cl       each Cl: 3 lone pairs
        |
        Cl
```

- **Count:** 4 + 4(7) = 32. **Check:** 4 bonds (8) + 24 dots = 32. All FC 0.
- **Shape:** **tetrahedral**, 109.5°.
:::

### Set 2: multiple bonds

**7.** N$_2$

::: details Reveal the answer
```text
 :N ≡ N:
```

- **Count:** 2(5) = 10. **Check:** 6 + 2 + 2 = 10. All FC 0. Linear.
:::

**8.** O$_2$

::: details Reveal the answer
```text
  ..  ..
  O = O
  ..  ..
```

- **Count:** 2(6) = 12. **Check:** 4 + 8 = 12. All FC 0. Linear.
:::

**9.** CO$_2$

::: details Reveal the answer
```text
  ..          ..
  O  =  C  =  O
  ..          ..
```

- **Count:** 16. **Check:** 8 + 8 = 16. All FC 0.
- **Shape:** 2 domains (a double bond counts as one): **linear**, 180°.
:::

**10.** CS$_2$

::: details Reveal the answer
```text
  ..      ..
  S = C = S
  ..      ..
```

- **Count:** 4 + 2(6) = 16. Same pattern as CO$_2$. All FC 0. **Linear**, 180°.
:::

**11.** COCl$_2$

::: details Reveal the answer
```text
   ..          ..
  :Cl  -  C  -  Cl:
   ..     ||   ..
         :O:
```

- **Count:** 4 + 6 + 2(7) = 24. **Check:** 8 in bonds + O 4 + Cl 12 = 24.
- The double bond goes to O, never to a Cl. All FC 0.
- **Shape:** **trigonal planar**, 120°.
:::

### Set 3: resonance

**12.** O$_3$

::: details Reveal the answer
```text
  ..     ..    ..            ..     ..    ..
  O  =   O  -  O:    <->    :O  -   O  =  O
  ..           ..            ..           ..
```

- **Count:** 3(6) = 18. **Check:** 3 lines (6) + middle 2 + double-bonded O 4 + single-bonded O 6 = 18.
- **Formal charges:** middle O has 2 + 3 = 5: **+1**. Single-bonded O: **−1**. Double-bonded O: 0. Sum 0.
- **Shape:** 3 domains, 1 lone pair: **bent**, about 119°. Bond order 1.5.
:::

**13.** NO$_2^-$

::: details Reveal the answer
```text
   ..    ..    ..          ..    ..    ..
   O  =  N  -  O:   <->   :O  -  N  =  O
   ..          ..          ..          ..
              (each in brackets, 1- outside)
```

- **Count:** 5 + 2(6) + 1 = 18. **Check:** 6 + N 2 + 4 + 6 = 18.
- **Formal charges:** N has 2 + 3 = 5: 0. Single-bonded O: **−1**. Sum −1.
- **Shape:** **bent**, about 119°. Bond order 1.5.
:::

**14.** NO$_3^-$

::: details Reveal the answer
```text
   ..          ..          ..          ..          ..          ..
   O  =  N  -  O:   <->   :O  -  N  =  O    <->   :O  -  N  -  O:
   ..    |     ..          ..    |     ..          ..    ||    ..
        :O:                     :O:                     :O:
         ..                      ..
                 (each in brackets, 1- outside)
```

- **Count:** 5 + 3(6) + 1 = 24. **Check:** 8 + 4 + 6 + 6 = 24.
- **Formal charges:** N has 4 lines, should have 5: **+1**. Each single-bonded O **−1**. Sum −1. N can't expand, so this is as good as it gets.
- **Shape:** **trigonal planar**, 120°. Bond order 1⅓.
:::

**15.** C$_2$H$_3$O$_2^-$ (acetate, CH$_3$COO$^-$)

::: details Reveal the answer
```text
      H           ..             H           ..
      |                          |
  H - C  -  C  =  O          H - C  -  C  -  O:
      |     |     ..   <->       |     ||    ..
      H    :O:                   H    :O:
            ..
                    (each in brackets, 1- outside)
```

In the second structure the bottom O has the double bond, and the right O has the single bond and 3 lone pairs.

- **Count:** 2(4) + 3(1) + 2(6) + 1 = 24. **Check:** 3 C–H (6) + C–C (2) + C=O (4) + C–O (2) + double-bonded O 4 + single-bonded O 6 = 24.
- **Formal charges:** both C's 0. Single-bonded O **−1**. Sum −1.
- **Shape:** the CH$_3$ carbon is **tetrahedral** (109.5°); the other carbon is **trigonal planar** (120°).
:::

**16.** C$_6$H$_6$ (benzene)

::: details Reveal the answer
```text
         H
         |
    H    C    H
     \ //  \ /
      C     C
      |     ||
      C     C
     / \\  / \
    H    C    H
         |
         H
```

- **Count:** 6(4) + 6(1) = 30. **Check:** 6 C–H (12) + 3 C=C (12) + 3 C–C (6) = 30, no dots.
- **Formal charges:** all 0.
- **Resonance:** shift all three double bonds one spot around the ring for the second structure. Every C–C bond is really 1.5. It's often drawn as a hexagon with a circle inside.
- **Shape:** each C **trigonal planar**, 120°.
:::

### Set 4: less than 8

**17.** BeCl$_2$

::: details Reveal the answer
```text
   ..        ..
  :Cl - Be - Cl:
   ..        ..
```

- **Count:** 2 + 2(7) = 16. **Check:** 4 + 12 = 16. Be has only **4**. All FC 0.
- **Shape:** **linear**, 180°.
:::

**18.** BCl$_3$

::: details Reveal the answer
```text
  Cl - B - Cl       each Cl: 3 lone pairs
       |            B: no dots, only 6 electrons
       Cl
```

- **Count:** 3 + 3(7) = 24. **Check:** 6 + 18 = 24. All FC 0.
- **Shape:** **trigonal planar**, 120°.
:::

**19.** GeF$_2$

::: details Reveal the answer
```text
  F - Ge - F        Ge: 1 lone pair
                    each F: 3 lone pairs
```

- **Count:** 4 + 2(7) = 18. **Check:** 4 + 12 + Ge 2 = 18.
- **Formal charges:** Ge has 2 + 2 = 4: 0. Each F 0.
- Ge ends up with only **6**, and that's correct: F can't double bond, and adding a dot would break the count.
- **Shape:** 3 domains, 1 lone pair: **bent**, under 120°.
:::

### Set 5: expanded, halogens outside

The rule for this whole set: single bonds, 6 dots on every outside halogen, and **all leftover electrons go on the center**.

**20.** PCl$_5$

::: details Reveal the answer
```text
         Cl
         |
   Cl -  P  - Cl     each Cl: 3 lone pairs
        / \
      Cl   Cl
```

- **Count:** 5 + 5(7) = 40. **Check:** 10 + 30 = 40. P has 10. All FC 0.
- **Shape:** 5 domains: **trigonal bipyramidal** (90°, 120°, 180°).
:::

**21.** SF$_6$

::: details Reveal the answer
```text
        F   F
         \ /
     F -  S  - F
         / \
        F   F
```

- **Count:** 6 + 6(7) = 48. **Check:** 12 + 36 = 48. S has 12. All FC 0.
- **Shape:** **octahedral**, 90°.
:::

**22.** SeF$_4$

::: details Reveal the answer
```text
        F
        |
   F - Se - F       Se: 1 lone pair
        |
        F
```

- **Count:** 6 + 4(7) = 34. **Check:** 8 + 24 + Se 2 = 34.
- **Formal charges:** Se has 2 + 4 = 6: 0. All 0.
- **Shape:** 5 domains, 1 lone pair: **see-saw**.
:::

**23.** ClF$_5$

::: details Reveal the answer
```text
          F
          |
     F - Cl - F      Cl: 1 lone pair
         / \
        F   F
```

- **Count:** 7 + 5(7) = 42. **Check:** 10 + 30 + Cl 2 = 42.
- **Formal charges:** Cl has 2 + 5 = 7: 0. All 0.
- **Shape:** 6 domains, 1 lone pair: **square pyramidal**.
:::

**24.** XeF$_2$

::: details Reveal the answer
```text
   ..           ..
  :F  -  Xe  -  F:      Xe: 3 lone pairs
   ..           ..
```

- **Count:** 8 + 2(7) = 22. **Check:** 4 + 12 + Xe 6 = 22.
- **Formal charges:** Xe has 6 + 2 = 8: 0. All 0.
- **Shape:** 5 domains, 3 lone pairs: **linear**, 180°.
:::

**25.** XeBr$_4$

::: details Reveal the answer
```text
        Br
        |
  Br - Xe - Br      Xe: 2 lone pairs
        |
        Br
```

- **Count:** 8 + 4(7) = 36. **Check:** 8 + 24 + Xe 4 = 36.
- **Formal charges:** Xe has 4 + 4 = 8: 0. All 0.
- **Shape:** 6 domains, 2 lone pairs: **square planar**, 90°.
:::

**26.** I$_3^-$

::: details Reveal the answer
```text
    ..          ..
 [ :I  -  I  -  I: ]-       middle I: 3 lone pairs
    ..          ..
```

- **Count:** 3(7) + 1 = 22. **Check:** 4 + 12 + middle 6 = 22.
- **Formal charges:** middle I has 6 + 2 = 8, should have 7: **−1**. Outer I's 0. Sum −1.
- **Shape:** 5 domains, 3 lone pairs: **linear**, 180°.
:::

**27.** IBr$_4^-$

::: details Reveal the answer
```text
         Br
         |
  [ Br - I - Br ]-     I: 2 lone pairs
         |
         Br
```

- **Count:** 7 + 4(7) + 1 = 36. **Check:** 8 + 24 + I 4 = 36.
- **Formal charges:** I has 4 + 4 = 8, should have 7: **−1**. Each Br 0. Sum −1.
- **Shape:** 6 domains, 2 lone pairs: **square planar**, 90°.
:::

### Set 6: expanded, oxygens outside

The rule for this set: start with single bonds, then turn O lone pairs into double bonds until the center's formal charge is 0. Whichever O's stay single carry the −1's, so expect resonance.

**28.** SO$_2$

::: details Reveal the answer
```text
Best by formal charge:        Octet-only version (two resonance structures):

   ..    ..    ..                ..    ..    ..          ..    ..    ..
   O  =  S  =  O                 O  =  S  -  O:   <->   :O  -  S  =  O
   ..          ..                ..          ..          ..          ..
```

- **Count:** 6 + 2(6) = 18. **Check (left):** 8 + S 2 + 8 = 18.
- **Formal charges (left):** all 0. (Right: S **+1**, single-bonded O **−1**.)
- Mrs. Cash's step 4 gives the left one. If a question asks for the best structure by formal charge, draw that; if it only asks you to follow the octet rule, the right pair works too.
- **Shape:** 3 domains, 1 lone pair: **bent**, about 119°.
:::

**29.** SO$_3$

::: details Reveal the answer
```text
   ..          ..
   O  =  S  =  O
   ..    ||    ..
        :O:
```

- **Count:** 6 + 3(6) = 24. **Check:** 3 double bonds (12) + 12 dots = 24.
- **Formal charges:** S has 6 lines: 0. Every O 0.
- **Shape:** 3 domains: **trigonal planar**, 120°.
:::

**30.** SO$_3^{2-}$

::: details Reveal the answer
```text
   ..    ..    ..
   O  =  S  -  O:
   ..    |     ..
        :O:
         ..
   (brackets, 2- outside)
```

- **Count:** 6 + 3(6) + 2 = 26. **Check:** 4 lines (8) + S 2 + double-bonded O 4 + two single-bonded O 12 = 26.
- **Formal charges:** S has 2 + 4 = 6: 0. Each single-bonded O **−1**. Sum −2.
- **Resonance:** the double bond can go on any of the three O's: three structures, bond order 1⅓.
- **Shape:** 4 domains, 1 lone pair: **trigonal pyramidal**, 107°.
:::

**31.** SO$_4^{2-}$

::: details Reveal the answer
```text
         ..
        :O:
   ..    |     ..
   O  =  S  =  O
   ..    |     ..
        :O:
         ..
   (brackets, 2- outside)
```

- **Count:** 6 + 4(6) + 2 = 32. **Check:** 6 lines (12) + two double-bonded O 8 + two single-bonded O 12 = 32.
- **Formal charges:** S has 6 lines: 0. Each single-bonded O **−1**. Sum −2.
- **Resonance:** any 2 of the 4 O's can hold the double bonds: six structures, each S–O bond order 1.5.
- **Shape:** **tetrahedral**, 109.5°.
:::

**32.** ClO$_3^-$

::: details Reveal the answer
```text
   ..    ..    ..
   O  =  Cl =  O
   ..    |     ..
        :O:
         ..
   (brackets, 1- outside)
```

- **Count:** 7 + 3(6) + 1 = 26. **Check:** 5 lines (10) + Cl 2 + 8 + 6 = 26.
- **Formal charges:** Cl has 2 + 5 = 7: 0. Single-bonded O **−1**. Sum −1.
- **Resonance:** three structures (any O can be the single one).
- **Shape:** 4 domains, 1 lone pair: **trigonal pyramidal**, 107°.
:::

**33.** PO$_4^{3-}$

::: details Reveal the answer
```text
         ..
        :O:
   ..    |     ..
  :O  -  P  =  O
   ..    |     ..
        :O:
         ..
   (brackets, 3- outside)
```

- **Count:** 5 + 4(6) + 3 = 32. **Check:** 5 lines (10) + double-bonded O 4 + three single-bonded O 18 = 32.
- **Formal charges:** P has 5 lines: 0. Each single-bonded O **−1**. Sum −3.
- **Resonance:** four structures (any O can be the double one).
- **Shape:** **tetrahedral**, 109.5°.
:::

## Optional: shape, polarity and hybridization

Not the focus of this quiz, but the Ch 8/9 test on Monday, November 23 uses them, and the page 13 set asks for shapes.

**Shape:** count domains on the center (every bond, single, double or triple, counts as **one**; so does each lone pair or single dot), then use Mrs. Cash's chart.

| Domains | Lone pairs | Shape | Angle | Hybridization |
|---:|---:|---|---|---|
| 2 | 0 | Linear | 180° | sp |
| 3 | 0 / 1 | Trigonal planar / Bent | 120° / 119° | sp² |
| 4 | 0 / 1 / 2 | Tetrahedral / Trigonal pyramidal / Bent | 109.5° / 107° / 104.5° | sp³ |
| 5 | 0 / 1 / 2 / 3 | Trigonal bipyramidal / See-saw / T-shaped / Linear | 90°, 120°, 180° | sp³d |
| 6 | 0 / 1 / 2 | Octahedral / Square pyramidal / Square planar | 90° | sp³d² |

**Polarity:** a molecule is nonpolar only if its bond polarities cancel: a symmetrical shape with the same atom on every outside spot (CO$_2$, CCl$_4$, XeF$_4$). Lone pairs on the center or mixed outside atoms usually make it polar (H$_2$O, SO$_2$, NF$_3$). Say "the bond polarities cancel," not just "symmetrical."

**Sigma and pi:** a single bond is 1 σ. A double bond is 1 σ + 1 π. A triple bond is 1 σ + 2 π.

## Sources and limits

**Teacher materials:** Mrs. Cascioli's *AP Chapter 8 and 9 Notes* (student copy, dated 10/30/2026; method slides on pp. 9–17, page 13 drawing examples, hybridization from p. 18), the *Chapter 8 and 9 Study list*, the *Drawing and Molecular Geometry Lab* species list, the molecular geometry chart, and the Ch 8/9 FRQ answers (resonance bond orders for SO$_3^{2-}$ and SO$_4^{2-}$). The quiz details come from her Schoology course update posted Tue 11/10/2026: a quick quiz on drawing Lewis structures, practice with the lab structures and packet examples, and a warning about speed. Videos: Mrs. Cash's electron-dot and formal-charge lessons (from transcripts), and the optional help video she linked.

**Limits:** the teacher copy of the notes, the worked-examples PDF and the filled-in geometry chart couldn't be downloaded, so the page 13 and lab answers here are worked independently, not copied from her keys. Each electron count and formal charge was rechecked. Where her formal-charge method and an octet-only drawing differ (SO$_2$), both are shown. The bent angles (119°, 104.5°) are from her chart.

