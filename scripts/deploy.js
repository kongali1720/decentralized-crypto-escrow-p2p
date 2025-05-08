async function main() {
  const [deployer] = await ethers.getSigners();
  const Escrow = await ethers.getContractFactory("Escrow");

  const buyer = "0x0000000000000000000000000000000000000001";
  const seller = "0x0000000000000000000000000000000000000002";
  const arbiter = deployer.address;

  const escrow = await Escrow.deploy(buyer, seller, arbiter, { value: ethers.utils.parseEther("1.0") });

  console.log("Escrow deployed to:", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
