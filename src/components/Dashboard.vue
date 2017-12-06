<template>
  <div id="dashboard">
    <h1 data-text="Let's vote">Let's vote</h1>
    
    <div class="form">
      <input type="text" v-model.lazy="newProposal" placeholder="Add your proposal">
      <input type="submit" name="submit" value="Submit proposal">
    </div>
    
    <table>
      <tr>
        <th><h3>Id</h3></th>
        <th><h3>Proposal</h3></th>
        <th><h3>Proposer</h3></th>
        <th><h3>Actions</h3></th>
      </tr>
      <tr v-for="proposal in proposals" class="proposal">
        <td :class="isWinning(proposal.id)">{{ proposal.id }}</td>
        <td>{{ proposal.description }}</td>
        <td>{{ proposal.proposer }}</td>
        <td class="button" @click="vote(proposal.id)">Vote!</td>
      </tr>
    </table>
    
  </div>
</template>

<script>
import Ballot from '@/js/ballot'

export default {
  name: 'dashboard',
  data () {
    return {
      proposals: [],
      newProposal: undefined,
      winningProposal: undefined
    }
  },
  beforeCreate: function () {
    let self = this
    Ballot.init()
    .then(() => Ballot.getProposals())
    .then(proposals => {
      self.proposals = proposals
      return Ballot.getWinningProposal()
    })
    .then(id => { self.winningProposal = id })
    .catch(err => console.log(err))
  },
  watch: {
    newProposal: function (proposal) {
      let self = this
      Ballot.createProposal(proposal)
      .then(tx => Ballot.getProposals())
      .then(proposals => { self.proposals = proposals })
      .catch(err => console.log(err))
    }
  },
  methods: {
    vote: function (id) {
      Ballot.vote(id)
      .then(tx => {
        alert('You\'ve just voted for proposal ' + id)
        Ballot.getWinningProposal()
      })
      .then(id => { self.winningProposal = id })
      .catch(err => console.log(err))
    },
    isWinning: function (id) {
      return id === this.winningProposal ? 'winning' : 'losing'
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~sass/fonts'
  @import '~sass/variables'
  
  #dashboard
    margin: auto
    width: 80%
    
    h1
      margin: 2rem auto 4rem auto
    
    .form
      display: flex
      flex-direction: row
      align-items: stretch
      align-content: stretch
      margin: 0 auto 4rem auto

      input
        outline: none !important

        background-color: $dark-white
        background-image: linear-gradient(to right, $pink, $red 50%, transparent 50%)
        background-repeat: no-repeat
        background-size: 202% 2px
        background-position: 100% 100%
                
        border: none
        border-radius: 0
        
        font-family: $font-stack
        font-size: 1.3rem
        line-height: 1.4em
        text-align: left
        
        width: 100%
        
        padding: 1rem 0.5rem
        
        transition: all 0.3s ease-in
        
        &:focus
          outline: none !important
          background-position: 0 100%
            
      input[type="submit"]
        background-color: $red
        
        border-radius: 0 4px 4px 0

        color: $light-grey

        font-family: $subtitle-font-stack
        font-size: 1.3rem
        line-height: 1em
        
        text-transform: uppercase
        text-align: center
        
        padding: 1rem
        
        flex-basis: 10%
        
        transition: color 0.3s ease-out
        
        &:hover
          color: $white
          cursor: pointer

    table
      margin: auto
      width: 100%
      tr
        th, td
          padding: 1rem 0.5rem
        th
          color: $red
        &:nth-child(1)
        &:nth-child(2n)
          background-color: $dark-white
          td
            border-right: 1px solid $white
        &:nth-child(2n+1)
          td
            border-right: 1px solid $dark-white
        td.winning
          color: $red
          font-weight: bold
        td.button
          font-family: $subtitle-font-stack
          text-transform: uppercase
          cursor: pointer
          transition: color 0.3s ease-out
          &:hover
            color: $red    

</style>
