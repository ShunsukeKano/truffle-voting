const VotingSystem = artifacts.require("VotingSystem");
const IERC20Address = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";

module.exports = async function (deployer) {
  await deployer.deploy(VotingSystem, IERC20Address);
};