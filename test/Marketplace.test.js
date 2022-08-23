const { assert } = require("chai");

const Marketplace = artifacts.require("./Marketplace.sol");


contract('Marketplace', (accounts) =>{
    let marketplace;

    before(async()=>{
        marketplace = await Marketplace.deployed();
    })

    describe('deployment',async()=>{
        it("deployed successfully", async() =>{
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined) 
        })
    })
})