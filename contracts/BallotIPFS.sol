pragma solidity ^0.4.11;

/// @title Voting with delegation.
contract BallotIPFS {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        address proposer;
        string url;
        uint voteCount; // number of accumulated votes
    }

    mapping(address => Voter) public voters; // This declares a state variable that // stores a `Voter` struct for each possible address.
    Proposal[] public proposals; // A dynamically-sized array of `Proposal` structs.
    
    event ProposalCreated(address indexed _address, string _url);
    event hasVoted(address indexed _address, uint _vote);

    function Ballot() public {
    }
    
    function createProposal(string _url) public {
      proposals.push(Proposal(msg.sender, _url, 0));
      ProposalCreated(msg.sender, _url);
      
    }
    
    function getNumberOfProposals() view public returns(uint) {
      return proposals.length;
    }
    
    function getProposalProposer(uint index) view public returns(address) {
      return proposals[index].proposer;
    }
    
    function getProposalUrl(uint index) view public returns(string) {
      return proposals[index].url;
    }
    
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += 1;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() view  public returns (uint _winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                _winningProposal = p;
            }
        }
    }

}