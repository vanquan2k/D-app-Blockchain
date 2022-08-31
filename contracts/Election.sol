pragma solidity 0.4.25;

contract Election {
     // Store Candidates Count
    uint public carCount =0;
    // Model a Candidate
    struct InsurranceContract {
        uint id;
        string loaixe;
        string biensoxe;
        string hangmucbaohiem;
        uint  giatien;
        uint voteCount;
    }
  

    // // Store accounts that have voted
    // mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => InsurranceContract ) public cars;
   

   event carClaim(
        uint id,
        string loaixe,
        string biensoxe,
        string hangmucbaohiem,
        uint  giatien,
        uint voteCount
  );
    constructor () public {
        addCar("Mazda","30B2_11111","ThanXe",1111);

    }

    function addCar(string _loaixe, string _biensoxe,string _hangmucbaohiem,uint _giatien) public {
        carCount ++;
        cars[carCount] = InsurranceContract(carCount, _loaixe,_biensoxe,_hangmucbaohiem,_giatien, 0);
        emit carClaim(carCount, _loaixe,_biensoxe,_hangmucbaohiem,_giatien, 0);

    }
 
//    function vote (uint _candidateId) public {
//         // require that they haven't voted before
//         require(!voters[msg.sender]);

//         // require a valid candidate
//         require(_candidateId > 0 && _candidateId <= candidatesCount);

//         // record that voter has voted
//         voters[msg.sender] = true;

//         // update candidate vote Count
//         candidates[_candidateId].voteCount ++;

//         // trigger voted event
//         emit votedEvent(_candidateId);
//     }
    
}