interface IVerifier {
    function verifyTx(Proof memory proof, uint[1] memory input) public view returns (bool r) 
};



contract DAO{
    struct Proof {
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
    }

    address public immutable verifier = 0xa2EaaE402F39C13387d61918cCCc72f945f4d1a4;

    function verify(uint[1] memory publicSignals, Proof memory proof) public view returns(bool){
        bool result = IVerifier(verifier).verifyTx(proof,publicSignals);
        return result;
    }
}