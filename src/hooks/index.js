import { Contract } from "ethers";
import SocialMediaContractBuild from "../../truffle/build/contracts/SocialMedia.json"
import { NETWORK_ID } from "../data";

export const contract = new Contract(SocialMediaContractBuild.networks[NETWORK_ID].address, SocialMediaContractBuild.abi);