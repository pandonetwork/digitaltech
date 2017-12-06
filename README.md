# Digital Tech / dApp workshop

A small truffle box crafted for the [dApp workshop](http://www.ladigital.tech/programme-jeudi-7-decembre/) of la [Digital Tech](www.ladigital.tech).

If you wanna get ready for the workshop please follow the installation process from point 1 to point 6.

We’ll see the rest in real-time during the workshop.

## Installation

You’re gonna need a few tools to develop for the Ethereum blockchain:

#### 1. Install [Metamask](https://metamask.io/)

#### 2. Install [node.js](https://nodejs.org/en/)

#### 3. Install [Atom](https://atom.io/) and its [solidity-linter](https://atom.io/packages/linter-solidity)

#### 4. Install a Solidity compiler

```
npm install -g solc
```

#### 5. Install a development Ethereum node

```
npm install -g ethereumjs-testrpc
```

#### 6. Install the truffle framework

```
npm install -g truffle
```

#### 7. Install our tutorial package

```
git clone https://github.com/wespr/digitaltech
```

#### 9. Install our tutorial dependencies

```
cd digitaltech && npm install
```

#### 8. You’re done!

## Run you first dApp

We’re gonna see how things work during the workshop. If you wanna take a look by yourself you can just:

#### 1. Launch testrpc

```
testrpc
```

#### 2. Compile and migrate the contracts

```
truffle compile
truffle migrate
```

#### 3. Run the webpack server with front-end hot reloading

```
npm run start
```