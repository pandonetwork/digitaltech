var Ballot = artifacts.require("./Ballot.sol");
var BallotIPFS = artifacts.require("./BallotIPFS.sol");


module.exports = function(deployer) {
  deployer.deploy(Ballot);
  deployer.deploy(BallotIPFS);
};
