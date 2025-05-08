const { expect } = require("chai");

describe("Escrow", function () {
  it("should allow buyer to release funds to seller", async function () {
    const [buyer, seller, arbiter] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.connect(arbiter).deploy(buyer.address, seller.address, arbiter.address, { value: ethers.utils.parseEther("1") });

    expect(await escrow.getBalance()).to.equal(ethers.utils.parseEther("1"));
    await escrow.connect(buyer).releaseFunds();
    expect(await escrow.status()).to.equal(2); // COMPLETE
  });
});
