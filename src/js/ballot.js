import contract from 'truffle-contract'
import BallotContract from '@contracts/Ballot.json'

const Ballot = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(BallotContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  getNumberOfProposals: function () {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getNumberOfProposals.call({from: window.web3.eth.accounts[0]})
      .then(nb => resolve(nb.toNumber()))
      .catch(err => reject(err))
    })
  },

  getProposalProposer: function (index) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getProposalProposer.call(index, {from: window.web3.eth.accounts[0]})
      .then(address => resolve(address))
      .catch(err => reject(err))
    })
  },

  getProposalDescription: function (index) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getProposalDescription.call(index, {from: window.web3.eth.accounts[0]})
      .then(description => resolve(description))
      .catch(err => reject(err))
    })
  },

  getProposal: async function (index) {
    let proposal = {}
    try {
      proposal.id = index
      proposal.proposer = await this.getProposalProposer(index)
      proposal.description = await this.getProposalDescription(index)
      return proposal
    } catch (e) {
      Promise.reject(e)
    }
  },

  getProposals: async function () {
    let proposals = []
    try {
      let nbOfProposals = await this.getNumberOfProposals()
      for (let i = 0; i < nbOfProposals; i++) {
        let proposal = await this.getProposal(i)
        proposals.push(proposal)
      }
      return proposals
    } catch (e) {
      Promise.reject(e)
    }
  },

  createProposal: function (description) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.createProposal(
        description,
        { from: window.web3.eth.accounts[0] }
      )
      .then(tx => resolve(tx))
      .catch(err => reject(err))
    })
  },

  vote: function (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.vote(
        id,
        { from: window.web3.eth.accounts[0] }
      )
      .then(tx => resolve(tx))
      .catch(err => reject(err))
    })
  },

  getWinningProposal: function () {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.winningProposal.call({from: window.web3.eth.accounts[0]})
      .then(id => resolve(id.toNumber()))
      .catch(err => reject(err))
    })
  }
}

export default Ballot
