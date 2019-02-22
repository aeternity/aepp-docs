---
layout: page
title: Introduction
---

# Developing æpps for the æternity blockchain


## Introduction
æternity is a modern blockchain which contains many features, such as naming, oracles, contracts and governance, as first-class members of its universe. æternity is open-source, with built in governance allowing its community to direct the growth and development of the blockchain. 

Apps built for the æternity blockchain are called æpps.

The [reference implementation of æternity](https://github.com/aeternity/epoch) is implemented in the [Erlang](https://www.erlang.org/) programming language. SDKs written in Javascript and Python provide interfaces to Epoch. Those wishing to implement their own nodes will want to start by checking out [the protocol](https://github.com/aeternity/protocol) guide and the [Epoch code](https://github.com/aeternity/epoch). For everyone else, there is directly speaking to Epoch, and the SDKs.

Epoch's API is documented in the [Protocol repository](https://github.com/aeternity/protocol).

The SDKs interface to Epoch may be either request/response or connection-oriented. The SDKs aim to shield users from these details and provide an idiomatic OO interface. We currently have [Javascript](https://github.com/aeternity/aepp-sdk-js) and [Python](https://github.com/aeternity/aepp-sdk-python) APIs, with more in the works.

This document is intended for people using the SDKs we provide. It does not go into detail about what is going on under the hood, rather concentrating on concepts instead. Details and code examples for the different languages are in the SDKs themselves, and Epoch is documented in [the Epoch repository](https://github.com/aeternity/epoch).

## Getting started

### Our release philosophy
We try to catch up with the æternity releases as quickly as possible, and to provide a stable environment for users and developers. Of course we have to compromise a little on both. We currently run two networks, `sdk-testnet` and `sdk-edgenet`. Testnet is the latest stable release, and Edgenet is the next. At the time of writing, testnet is at epoch verson 0.18 and edgenet is at version 0.22 of Epoch.

If you download from package managers, you'll automatically connect to testnet. If you clone the repository, you'll connect to edgenet. If you run your own nodes, you can use whatever version you like, of course.

### How it works for you
For software developers, we recommend connecting to one of our test chains. Our releases trail those of the main æternity epoch releases. As soon as we have a stable SDK for the latest Epoch, we release it, and update the test chain, which is always available at `http://sdk-testnet.aepps.com`. However at the moment, as long as you're willing to put up with some instability, we would strongly recommend connecting to the edgenet at `https://sdk-edgenet.aepps.com`, which entails cloning the repository of your chosen SDK.

If you want to run your own node and connect to the main testnet, the best and easiest way to get up and running is to use a Docker image of the latest released version of Epoch. You can find a list of released versions [here](https://github.com/aeternity/epoch/releases). The instructions for downloading a Docker image should be much easier to find (we're working on this!) but are in the section entitled 'Install node'. They do not tend to change from release to release, so [here is a link to the latest](https://github.com/aeternity/epoch/blob/master/docs/docker.md). However around the first few days after an Epoch release, the SDKs may not fully support this version.

Lastly, if you wish to track the bleeding edge of æternity development, for instance if you want to help with core development, or run a mining node and really understand what is going on under the hood, clone the [github repository](https://github.com/aeternity/epoch) and follow the [Getting started guide](https://github.com/aeternity/aepp-sdk-python/blob/master/INSTALL.md). Things may stop working, and from time to time the SDKs will be out of sync with masters, so unless you really need the newest features we would generally recommend getting the latest release.

As an introduction to the usage of the SDKs, examples are provided in the `examples/` directories of each SDK. The contents vary but in general we have tried to show the basic usage of each major feature of the blockchain. 

## Major components

### Epoch
Epoch is the reference æternity implementation. It is a full node on the blockchain, able to mine blocks (see later), communicate with other peers, create and post transactions.

### Key Pairs
Each account on the blockchain is represented by a private and public key pair. The public key is your identity to the outside world. The private key you use to sign transactions, and must at all costs be kept secret. If your private key is discovered by someone else, they can use it to impersonate you and take your tokens. You must keep your private key secret.

If you have an Epoch node then you will have a public/private key generated for you. Wallet software will also do this. Each SDK will shortly have a utility function to generate key pairs.

### Block generation
As with all blockchains, æternity's transactions are demarcated by block boundaries. This means that for every action you make, you must wait for the transaction to be written into a block before moving on and doing something else. We provide convenience methods which wait for a block generation event, and ensure that your transaction is now part of the permanent record. There still remains the possibility that the chain you have been working on will be orphaned, when the blockchain forks and the yours is the loser in an election.

Blocks are generated *on average* every X minutes, which slows down the rate at which you can put transactions through. A typical interaction with the blockchain could look like this:

- Create oracle
- Wait for block
- Subscribe to your oracle to receive queries
- Wait for block
- Receive query
- Wait for block
- Respond

We endeavour with the SDKs to make this as convenient as possible. For the purpose of brevity, in the rest of this document the 'wait for block' will be omitted.

Block generation is a blockchain's heartbeat, and is the only way that on-block entities are aware of the passage of time. Oracles are created with a time-to-live (TTL), after which they expire from the chain. Queries sent to oracles are given a TTL. Block generation, as previously stated, averages to one per 10 minutes--but there is no guarantee that from one block to the next the interval will be this, or even close to it. For activities which need to occur more rapidly side channels enable behaviour which is closer to interactive.

æternity will be implementing BlockchainNG in the near future, which will generate blocks every 10-15 seconds. While we wait for this, our Getting Started guide for developers includes instructions to speed up block generation for your private test network to approximately this speed.

Blocks contain proof that a certain set of transactions have been committed to the chain--this is why we wait for a block containing our transaction to be mined before moving on to the next. The process by which this occurs is called *mining* and is outside the scope of this document. For more information on mining please consult the æternity specification.

### Naming Service
The æternity naming service relates human-readable names to public keys for accounts and oracles. The naming system is designed for the zero-trust blockchain model, specifically in order to prevent malicious nodes from stealing names from clients. In order to prevent this, the model is:

- A client which wants a name makes a hash of that name, along with a secret number, called the *salt*.
- The client uses this hash to *pre-claim* the name. At this point, no-one else can see what the name is, but the client can prove that they made the pre-claim.
- The client then *claims* the name, passing in the salt from before. Now everyone can see how the hash in the initial step was arrived at. The name is booked with a TTL, after which it expires. The name can either be associated with an account, or with an oracle, and now the name can be used to whereever an account or oracle address is needed.
- If the client no longer needs or wants the name, it *revokes* the name. After this the name can be claimed by someone else.
- The client can *transfer* the name to someone else.

Names exist in *namespaces*. Similar to DNS, the '.' character is used as a separator. At this stage only the `.aet` namespace is available.

### Oracles
An oracle is an interface between æternity and the outside world. They can be referenced in contracts, and also interacted with directly. The sequence of events for creating an oracle and responding to events is

- Create oracle with *request* and *response* formats (which are currently not used), and a given *TTL* and *fee* for queries (which can be 0)
- Subscribe to the oracle
- Receive a query from a client and respond to that query
- Repeat until *TTL* blocks have been generated
- Oracle exits, or its lifespan can be extended.

In between each step above, a block must be generated. 

Clients can interact with an oracle by their public key, or by name using the AENS described above. The sequence of events for a client to interact with an oracle is

- Send the oracle a query
- Subscribe to the query
- Wait for result (or give up if TTL exceeded)

If the TTL of the query+response would exceed the oracle's remaining TTL then the query will not be sent.

### Contracts
Contracts are programs which live on the blockchain and allow users to formalise agreements between each other. Virtual machines running on nodes execute the contracts, for which the nodes receive fees. A contract will run when it receives an event from the outside world, which could be payment from a user, or some event from the outside world, delivered via an oracle.

The æternity blockchain supports three different virtual machines, which contracts run on:

- the ethereum VM, modified to not support the KILL instruction, which has proved dangerous in practise.
- FTWVM, a strongly typed virtual machine which is designed to work with the functional language Sophia, which supports strong type checking and rigorous proofs.
- FLM, a simple virtual machine, which because it can access æternity's rich built in types nevertheless allows powerful contracts to be created. Due to its simplicity the gas cost (see below) of FLM contracts can be accurately estimated.

The three are designed to support different use cases, with the ethereum VM existing in order to support people moving to æternity, and the other two offering specific advantages in terms of safety and simplicity.

æternity's implementation of ethereum's VM has a major difference--it removes the KILL instruction. Instead of permitting this, æternity's contracts expire when they are no longer referred to.

Contracts must be compiled before they are uploaded to the blockchain. Epoch will compile contracts, but they can be compiled in other ways too. The compiled bytecode is stored on the chain and executed by the nodes. This execution uses CPU power on the nodes, and so it is paid for, using *gas*. A contract which has run out of gas will no longer be executed. The FLM VM is simple enough that the gas price for a contract can be accurately estimated at compile time; for the other VMs the developer is responsible for working out their own gas budget.

A discussion of the concepts is [here](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas).
