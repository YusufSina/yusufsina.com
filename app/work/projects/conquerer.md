---
id: 2
title: Conquerer
date: "2022-06-01"
year: 2022
role: "Team lead & blockchain developer"
status: "Hackathon project · Archived"
stack: ["Solidity", "OpenZeppelin ERC-721", "Chainlink", "React", "web3.js", ".NET Core 3.1"]
excerpt: "An on-chain strategy game where Turkey's 81 provinces are NFTs. Players buy a city, train soldiers and conquer neighbouring provinces until one emperor holds the whole map. Built by a team of four for the Açık Hack 2022 hackathon."
slug: conquerer
link: "https://github.com/YusufSina/fetih"
---

![Conquerer game map showing the 81 provinces of Turkey](/images/conquerer/map.png)

## The idea

Conquerer (originally *Fetih*, "conquest" in Turkish) is a strategy game that lives on a blockchain. The map is Turkey, and each of the 81 provinces is an NFT. You buy one city to enter the game, build an army, and attack the provinces that share a border with yours. Whoever ends up owning all 81 cities wins the prize pool.

We built it for the **Açık Hack 2022** hackathon as a team of four. I led the team and wrote the smart contracts.

- **My role:** Team lead, blockchain developer
- **Team:** Samet Yazıcı (front-end), Vahit Atakan Küpçüoğlu (back-end), Neslihan Akbulut (design)
- **Network:** Ethereum Rinkeby testnet (now retired)

## How the game works

- **Cities are NFTs.** The contract mints all 81 provinces as ERC-721 tokens at deployment, each starting with 10 soldiers. A player can buy one city to join.
- **Training soldiers takes time.** A city's barrack produces 5 soldiers after one hour. The timer is enforced on-chain with block timestamps, so nobody can skip it.
- **You can only attack neighbours.** The contract stores a border map of the provinces and rejects attacks on cities that don't share a border with yours.
- **Battles change ownership.** Winning an attack transfers the defender's NFT to the attacker. Losing costs the attacker soldiers.
- **The winner takes the pot.** When one player owns every city, the contract pays out 90% of the collected entry fees to them and keeps 10% as commission.

## Key technical decisions

**Deciding battles off-chain through an oracle.** A battle needs an outcome that the attacker can't predict or game, and doing that randomness purely on-chain is hard. So the `battle` call doesn't settle anything itself: it asks a **Chainlink** oracle to call our .NET API with both armies' sizes. The API decides the result, and the oracle writes it back to the contract, which then moves soldiers and city ownership. The trade-off is trust: players have to trust our API, which a production version would replace with Chainlink VRF.

**Keeping game rules in the contract.** Everything that decides who owns what (city ownership, soldier counts, borders, the barrack timer and the prize payout) lives in the Solidity contract, built on OpenZeppelin's audited ERC-721 implementation. The back-end only resolves battles and serves city metadata.

**A real map as the interface.** The React front-end draws the province map, shows who owns each city and how many soldiers it has, and sends transactions through web3.js and the player's wallet.

## Tech stack

- **Smart contracts:** Solidity 0.8, OpenZeppelin (ERC-721, Enumerable, Ownable), Chainlink oracle client
- **Front-end:** React, React Bootstrap, web3.js
- **Back-end:** C# / .NET Core 3.1 API for battle results and NFT metadata

## Looking back

The Rinkeby testnet has since been shut down, so the game no longer runs. If I built it today, I would use Chainlink VRF for verifiable randomness instead of our own API, and deploy to a layer-2 network to keep transaction fees low enough for a game.

The full source and contracts are on [GitHub](https://github.com/YusufSina/fetih).
