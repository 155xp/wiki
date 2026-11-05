---
visibility: public
title: NASA aircraft-to-ground quantum link
description: What the viral "NASA makes U.S. history with first-ever quantum link" post means. In October 2026 a NASA PC-12 and a ground station passed single photons over a quantum channel. It was a U.S. first, not a world first, and so far NASA has released very few details.
updated: 2026-11-05
infobox:
  title: NASA air-to-ground quantum link
  Flight date: 21 October 2026 (per NASA Glenn)
  Announced: 4 November 2026, in a NASA Glenn thread on X
  Led by: NASA Glenn Research Center
  Aircraft: Pilatus PC-12, tail N606NA
  What was sent: Single photons over a free-space quantum channel
  Claim: First aircraft–ground quantum link in the U.S.
  World first: Germany, 2013 (aircraft-to-ground key exchange)
  Press release: None found on nasa.gov as of 5 November 2026
---

On 5 November 2026, Polymarket posted on X: "BREAKING: NASA makes U.S. history with first-ever quantum link established between an aircraft & the ground."[^poly] The post refers to a flight test by **NASA's Glenn Research Center**. On 21 October 2026, a NASA PC-12 airplane and a ground station sent single particles of light, called **photons**, to each other over a *quantum channel*. NASA says this is "the first time this has been achieved in the U.S."[^glenn1][^glenn3]

Put simply, a plane and a ground station aimed a very faint laser at each other while the plane flew, counted individual photons, and recorded the results. Setups like this are how **quantum key distribution** (QKD) works. QKD makes encryption keys whose secrecy is protected by physics instead of by hard math problems. The result is real, and it is a first for the U.S. It is not a world first, since a German team did air-to-ground QKD in 2013.[^nauerth] It also isn't teleportation. And because NASA has so far announced it only in a thread on X, most of the numbers you would want to know haven't been published yet.

By the end of this article, you will be able to explain what a "quantum link" carries, why doing one from a plane is hard, and which parts of the viral post hold up.

## What a "quantum link" is

A normal laser link carries data the way your Wi-Fi does: billions of photons per second, switched on and off to mean 1s and 0s. A **quantum link** is different. It sends photons *one at a time* and records a bit in each photon's quantum state, usually its polarization (the direction its electric field wiggles).

Why bother sending something so fragile? Because a single photon can't be secretly copied. To read a photon's state, you have to measure it, and measuring it in the wrong way changes it. Physicists call this the *no-cloning* rule. It turns eavesdropping into something you can detect. That is the basis of QKD. The 2020 NASA article on its QTech project describes QKD as using "specialized laser and photon detector technology" so that aircraft can "exchange encryption keys".[^qtech]

There are two main ways to do QKD:

- **Prepare and measure.** The sender sets each photon's polarization at random, choosing between two "bases", such as straight (| or —) and diagonal (/ or \\). The receiver also measures each photon in a randomly chosen basis. Afterwards, the two sides announce over an ordinary public channel which bases they used, though not the results, and they keep only the photons where their bases matched. An eavesdropper who measures photons in transit will sometimes guess the wrong basis, and those wrong guesses show up as errors. If the error rate is low, the leftover bits become a shared secret key. This protocol is called **BB84**, and it is the one the German aircraft team used.[^nauerth]
- **Entanglement-based.** A source makes pairs of *entangled* photons and sends one photon of each pair to each side. When both sides measure in the same basis, their results match, even though each result on its own is random. The source doesn't need to be trusted, and it can sit in the middle, for example on a plane or a satellite. NASA Glenn has worked on entangled-photon sources for years.[^qis]

For a reader with a cyber background, here's the catch. QKD only **makes a shared key**. You still encrypt your data with that key using ordinary methods, such as a one-time pad or AES. And the public "which basis did you use?" conversation still has to be authenticated, or someone in the middle could pose as the other side.

## What NASA actually said

As of 5 November 2026, there is no NASA press release, technical paper or nasa.gov feature about this flight. Glenn's news feed has nothing on it either, though its most recent update came before the announcement.[^feed] The primary source is a three-post thread from NASA Glenn's official X account, posted on 4 November 2026. Here is what it says:

1. Researchers "successfully sent tiny light particles, or photons, between an aircraft and a ground station over a quantum channel, the first time this has been achieved in the U.S."[^glenn1]
2. They used "NASA Glenn facilities and the PC-12 aircraft" to test technology for quantum networks that could carry "quantum information — as well as classical data and communications".[^glenn2]
3. "On Oct. 21, the team successfully locked onto a quantum signal and recorded data in flight", a "major first step toward incorporating airborne systems in nationwide quantum networks."[^glenn3]

The photos in the thread show NASA aircraft N606NA, a Pilatus PC-12 single-engine turboprop.[^glenn1][^pc12] They also show an operations room and an optical tracking telescope on a rooftop.[^glenn1]

The thread leaves out almost everything a physicist would ask about. It doesn't give the distance, photon rate, error rate, or whether a secret key was actually produced. It doesn't say whether the photons were entangled or which way they traveled. Secondhand write-ups note the same gaps.[^substack] So, strictly, NASA has said only that the two ends *locked onto the quantum signal and recorded data*. A claim like "they exchanged a quantum key" may be true, but nothing published supports it yet.

### Where it came from

The flight builds on older Glenn projects, and it is easy to mix them up:

- **QTech** (2020). Glenn and Ames worked with the Air Force Research Laboratory and IJK Controls on QKD for uncrewed aircraft. Laser hardware mounted on a Twin Otter "performed successfully in aircraft flight tests". The article does not say that quantum keys were exchanged in flight.[^qtech]
- **Airborne Laser Communication Testbed** (2019–2025). Ordinary laser communication at gigabit-class rates, up to 60 km, flown on the Twin Otter and the same PC-12. This is a classical link and has nothing quantum about it.[^alct] The page also lists a Glenn patent for sending a QKD channel and a classical channel into a single optical fiber.[^alct]
- **Photon-pair sources** (2015–2016). Through small-business (SBIR) contracts, the company AdvR built Glenn a source of entangled photon pairs based on a KTP crystal waveguide, which Glenn tested in a ground QKD experiment.[^advr] Some viral summaries say this source flew in October 2026. NASA hasn't said what hardware was on board.

## Why doing it from a plane is hard

Sending single photons across a lab table is routine. Doing it to a plane that's moving fast miles away is a different problem. Figure 1 shows the main ones.

<figure class="diagram">
<svg viewBox="0 0 640 280" role="img" aria-labelledby="air-title" xmlns="http://www.w3.org/2000/svg">
<title id="air-title">A ground telescope at lower left aims a narrow, wobbling beam of single photons at an airplane at upper right. Labels mark four problems: the plane keeps moving, turbulence bends and spreads the beam, sunlight and city lights add stray photons, and clouds or terrain can break the line of sight.</title>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g font-family="-apple-system,Segoe UI,Roboto,Arial,sans-serif" font-size="14" fill="currentColor">
<line x1="20" y1="252" x2="620" y2="252" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/>
<rect x="60" y="222" width="56" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<rect x="72" y="200" width="22" height="30" rx="3" transform="rotate(-25 83 215)" style="fill:var(--inner-bg);stroke:var(--inner)" stroke-width="1.5"/>
<text x="88" y="272" text-anchor="middle" font-size="13" fill-opacity="0.8">ground station</text>
<g transform="translate(520 52)">
<path d="M-46,0 L40,0 Q52,0 52,6 Q52,12 40,12 L-46,12 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M-6,4 L-26,-26 L-14,-26 L10,4 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M-6,8 L-26,38 L-14,38 L10,8 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M-46,0 L-54,-16 L-46,-16 L-36,0" fill="none" stroke="currentColor" stroke-width="1.5"/>
</g>
<text x="520" y="112" text-anchor="middle" font-size="13" fill-opacity="0.8">PC-12</text>
<path d="M104,206 C170,190 200,186 250,168 S330,150 370,128 S450,96 470,72" fill="none" style="stroke:var(--outer)" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round"/>
<path d="M104,206 C175,176 220,184 260,160 S340,136 380,120 S446,90 470,72" fill="none" style="stroke:var(--outer)" stroke-opacity="0.35" stroke-width="1.2"/>
<line x1="572" y1="58" x2="618" y2="58" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<text x="616" y="34" text-anchor="end" font-weight="600">1. Moving target</text>
<text x="616" y="84" text-anchor="end" font-size="13" fill-opacity="0.8">aim within metres</text>
<text x="236" y="122" text-anchor="middle" font-weight="600" style="fill:var(--outer)">2. Turbulence</text>
<text x="236" y="140" text-anchor="middle" font-size="13" fill-opacity="0.8">bends and spreads the beam</text>
<circle cx="300" cy="26" r="14" fill="none" stroke="currentColor" stroke-width="1.5"/>
<line x1="300" y1="44" x2="300" y2="56" stroke="currentColor" stroke-width="1.5"/>
<line x1="318" y1="26" x2="330" y2="26" stroke="currentColor" stroke-width="1.5"/>
<line x1="282" y1="26" x2="270" y2="26" stroke="currentColor" stroke-width="1.5"/>
<text x="340" y="22" font-weight="600">3. Sunlight</text>
<text x="340" y="40" font-size="13" fill-opacity="0.8">stray photons look like signal</text>
<path d="M330,226 q10,-16 26,-8 q12,-16 30,-4 q18,-2 16,14 z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="420" y="224" font-weight="600">4. Line of sight</text>
<text x="420" y="242" font-size="13" fill-opacity="0.8">a cloud blocks it completely</text>
</g>
</svg>
<figcaption>Figure 1. The main problems for an air-to-ground quantum link. The dotted red line is the beam of single photons, and the faint line is where turbulence pushes it a moment later.</figcaption>
</figure>

1. **Pointing and tracking.** The beam has to be narrow so that enough photons arrive, but a narrow beam has to stay on a moving target. In the German 2013 test the plane flew at 290 km/h, 20 km from the ground station.[^nauerth] Both ends need fast steering mirrors and tracking cameras, which is what "locked onto a quantum signal" refers to.[^glenn3]
2. **Turbulence.** Pockets of warmer and cooler air act like weak, constantly shifting lenses. They make the beam wander and the received signal flicker, an effect called *scintillation*.
3. **Background light.** The detector counts single photons, so one stray photon from the Sun or a streetlight in the right time slot looks like real signal and adds errors. That's why many tests fly at night. The German team transmitted "shortly after sunset".[^physicsworld]
4. **Line of sight.** Light can't go through clouds, and RF radio can. The NASA classical laser testbed also needs "clear line of sight".[^alct]
5. **Size, weight and power.** Everything on the plane has to fit in a small aircraft, survive vibration, and run on its power supply.

## Why it matters

A quantum network needs *nodes*, places where quantum signals start, end or get relayed. Fiber works well for the first hundred kilometres or so, but photons get absorbed along the way, and you can't amplify a quantum signal without destroying it. Free-space links through the air and through space are the main way to go farther. Planes can serve as nodes that move: they can fly to where a link is needed, and they're a cheaper way to test hardware before it goes into orbit. The German team argued that an air-to-ground link has about the same signal loss and fluctuations as a link between the ground and a satellite in low Earth orbit.[^nauerth]

Satellites have already shown how far this can go. In 2017 the Chinese satellite Micius ran QKD with a ground station up to 1,200 km away, at key rates above a kilohertz.[^micius] NASA's stated goal is to bring "airborne systems" into "nationwide quantum networks".[^glenn3] NASA has also said these links could carry classical data alongside quantum signals,[^glenn2] which matches its earlier work on combining the two kinds of channel.[^alct]

## What it does not mean

- **It isn't faster-than-light messaging.** Entanglement makes measurement results *correlated*, but each result on its own is random, so you can't use it to send a message. This is the *no-communication theorem*. The two sides still have to compare notes over an ordinary channel.
- **It isn't teleportation of objects.** "Quantum teleportation" means moving a photon's *state*, and it also needs an ordinary channel. Nobody is teleporting anything physical.
- **It isn't a quantum internet.** It's one link, between one plane and one ground station, on one test day.
- **It isn't a fast data link.** Quantum links carry very little data. The 2013 German link ran at about 145 bits per second.[^physicsworld] Gigabit air-to-ground data is a separate classical laser project.[^alct]
- **It isn't a world first.** Germany did BB84 QKD from an aircraft to a ground station in 2013. The paper's abstract says it proved "for the first time, the feasibility of BB84 QKD between an aeroplane and a ground station".[^nauerth] Canada did ground-to-aircraft QKD, publishing in 2017, with links of 3–10 km and secure keys up to 868 kb long.[^canada] In 2025, Germany's DLR flew a Dornier 228 over Erlangen, tested a QKD system in flight, and detected photons from an entanglement source on the ground.[^dlr] Polymarket's "first-ever" is true only with NASA's qualifier, "in the U.S."

::: check Which claim can you make from what NASA has published so far?
- [ ] NASA beat every other country to an air-to-ground quantum link.
  Germany did it in 2013, and Canada published its own in 2017.
- [ ] NASA used the PC-12 to exchange a secret key with the ground.
  That may be true, but NASA hasn't released key rates or said that a key was made.
- [x] NASA locked onto a quantum signal between a PC-12 and a ground station and recorded data, a first for the U.S.

NASA's thread supports exactly this much. Everything beyond it is waiting for a paper or a press release.
:::

::: takeaways
- A **quantum link** sends single photons whose quantum states can be used to build a shared secret key (QKD). Eavesdropping causes errors that the two sides can detect.
- On **21 October 2026**, NASA Glenn locked onto a quantum signal between a **PC-12** and a ground station, which NASA calls a **U.S. first**.
- It is **not a world first** (Germany did it in 2013), not faster than light, and not teleportation.
- As of 5 November 2026, the only primary source is a **NASA Glenn thread on X**. There's no press release and no paper, and no distance, error rate or key rate has been published.
:::

[^poly]: Polymarket (5 November 2026). Post on X. [x.com/Polymarket/status/2118315094937342066](https://x.com/Polymarket/status/2118315094937342066).
[^glenn1]: NASA Glenn Research Center (4 November 2026). "We're taking quantum communications to new heights!" Thread on X, post 1/3, with photo descriptions. [x.com/NASAglenn/status/2117995323104666087](https://x.com/NASAglenn/status/2117995323104666087).
[^glenn2]: NASA Glenn Research Center (4 November 2026). Thread on X, post 2/3. [x.com/NASAglenn/status/2117995335507181657](https://x.com/NASAglenn/status/2117995335507181657).
[^glenn3]: NASA Glenn Research Center (4 November 2026). Thread on X, post 3/3. [x.com/NASAglenn/status/2117995348358566263](https://x.com/NASAglenn/status/2117995348358566263).
[^feed]: NASA. "Glenn Research Center" news feed, last built 28 October 2026, with no item on the flight. [nasa.gov/centers-and-facilities/glenn/feed](https://www.nasa.gov/centers-and-facilities/glenn/feed/).
[^pc12]: Whiting, T. (24 March 2026). "NASA PC-12 Aircraft Makes Move to Support Flight Research Across Agency". NASA. [nasa.gov](https://www.nasa.gov/image-article/nasa-pc-12-aircraft-makes-move-to-support-flight-research-across-agency/).
[^substack]: Perera, S. A. (5 November 2026). Note on Substack, a secondary summary. [substack.com](https://substack.com/@shanakaanslemperera/note/c-379394412).
[^qtech]: NASA Glenn Communications (23 January 2020). "Quantum Technologies are Changing the Face of Unmanned Aircraft Communications". NASA. [nasa.gov](https://www.nasa.gov/aeronautics/quantum-technologies-are-changing-the-face-of-unmanned-aircraft-communications/).
[^alct]: NASA Glenn. "Airborne Laser Communication Testbed". Updated 11 September 2025. [nasa.gov](https://www.nasa.gov/glenn/research/airborne-laser-communication-testbed/).
[^qis]: NASA Glenn. "Quantum Information Systems for Networking and Sensing". Updated 10 July 2025. [nasa.gov](https://www.nasa.gov/glenn/research/quantum-information-systems-for-networking-and-sensing/).
[^advr]: Wilson, J. et al. (2016). "Free-Space Quantum Key Distribution with a High Generation Rate KTP Waveguide Photon-Pair Source". SPIE Optics + Photonics. NASA Technical Reports Server 20170004554. [ntrs.nasa.gov](https://ntrs.nasa.gov/citations/20170004554).
[^nauerth]: Nauerth, S., Moll, F., Rau, M., Fuchs, C., Horwath, J., Frick, S. & Weinfurter, H. (2013). "Air-to-ground quantum communication". *Nature Photonics*. [doi:10.1038/nphoton.2013.46](https://www.nature.com/articles/nphoton.2013.46). Abstract via [DLR elib](https://elib.dlr.de/81410/).
[^physicsworld]: Johnston, H. (5 April 2013). "Quantum signal sent from aircraft". *Physics World*. [physicsworld.com](https://physicsworld.com/a/quantum-signal-sent-from-aircraft/).
[^canada]: Pugh, C. J. et al. (2017). "Airborne demonstration of a quantum key distribution receiver payload". *Quantum Science and Technology* 2, 024009. [arXiv:1612.06396](https://arxiv.org/abs/1612.06396).
[^dlr]: DLR (10 October 2025). "Laying the foundation for a future quantum network – quantum channels tested in flight". [dlr.de](https://www.dlr.de/en/latest/news/2025/laying-the-foundation-for-a-future-quantum-network-quantum-channels-tested-in-flight).
[^micius]: Liao, S.-K. et al. (2017). "Satellite-to-ground quantum key distribution". *Nature*. [arXiv:1707.00542](https://arxiv.org/abs/1707.00542).
