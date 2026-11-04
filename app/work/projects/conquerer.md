---
id: 2
title: Conquerer
date: "2026-01-02"
excerpt: "A blockchain-based web game where players conquer cities, declare war on neighbors, and expand their territories. Game state is managed on-chain through smart contracts."
slug: conquerer
link: "https://github.com/YusufSina/fetih"
---

![Conquerer Game Screenshot](https://raw.githubusercontent.com/YusufSina/fetih/main/ss1.png)

## Overview

Conquerer is a blockchain-based web gaming platform that combines strategy, territorial expansion, and on-chain game mechanics. Players interact with a map-based interface where they can acquire cities, declare war on neighboring territories, and expand their influence across the game world.

## Key Features

### Map-Based Gameplay
- Interactive map interface showing cities and territories
- Visual representation of player-controlled areas
- Strategic positioning and expansion mechanics

### City Management
- Players can acquire and control cities
- Each city represents a strategic asset on the map
- City ownership is tracked on the blockchain

### War & Expansion
- Declare war on neighboring cities
- Expand your territory through conquest
- Strategic gameplay requiring planning and resource management

### Blockchain Integration
- Game state stored on-chain via smart contracts
- Transparent and verifiable game mechanics
- Decentralized ownership of in-game assets

## Technical Implementation

The game leverages smart contracts to manage all critical game state, ensuring transparency and immutability. The core contract logic handles:

- City ownership and transfers
- War declarations and outcomes
- Territory expansion mechanics
- Player interactions and state updates

The frontend provides an intuitive web interface that interacts with the blockchain, allowing players to visualize the map, manage their cities, and execute strategic moves.

## Smart Contract

The game's smart contract implementation can be found in the [Fetih.sol](https://github.com/YusufSina/fetih/blob/main/contracts/Fetih.sol) file, which defines the core game logic and state management on the blockchain.

## Technology Stack

- **Blockchain**: Smart contracts for game state management
- **Web Interface**: Interactive map and game UI
- **Game Mechanics**: Strategy-based territorial expansion

