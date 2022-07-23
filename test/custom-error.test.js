const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('CustomError', function () {
  async function deployContractFixture() {
    const [owner] = await ethers.getSigners();

    const CustomErrorContract = await ethers.getContractFactory('CustomError');
    const contract = await CustomErrorContract.deploy();
    return { contract, owner };
  }

  it('should revert with custom error "Unauthorized"', async () => {
    const { contract } = await loadFixture(deployContractFixture);

    await expect(contract.hello()).to.be.revertedWithCustomError(
      contract,
      'Unauthorized'
    );
  });

  it('should revert with custom error "InvalidAmount"', async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const TWENTY_WEI = 20;

    await expect(contract.hi(TWENTY_WEI))
      .to.be.revertedWithCustomError(contract, 'InvalidAmount')
      .withArgs(TWENTY_WEI, owner.address);
  });

  it('should say hi and return TRUE', async () => {
    const { contract } = await loadFixture(deployContractFixture);

    const FIVE_WEI = 5;

    const hi = await contract.hi(FIVE_WEI);
    await expect(hi).to.be.true;
  });
});
