const ConvertLib = artifacts.require("ConvertLib");
const SocialMedia = artifacts.require("SocialMedia");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SocialMedia);
  deployer.deploy(SocialMedia);
};
