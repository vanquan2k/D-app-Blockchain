pragma solidity 0.4.25;

contract Election {
     uint public taskCount = 0;
    // Model a Candidate
    struct Candidate {
        uint id;
        string loaixe;
        string biensoxe;
        string hangmucbaohiem;
        uint  giatien;
        uint voteCount;
    }
    mapping(uint => Task) public tasks;

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );
   event TaskClaim(
         uint id;
        string loaixe;
        string biensoxe;
        string hangmucbaohiem;
        uint  giatien;
        uint voteCount;
  );
    constructor () public {
        addCandidate("Mazda","30B2_11111","ThanXe",1111);
        addCandidate("Vinfast","30B2_99999","ThanXe",10000);
       
        
    }

    function addCandidate (string _loaixe, string _biensoxe,string _hangmucbaohiem,uint _giatien) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _loaixe,_biensoxe,_hangmucbaohiem,_giatien, 0);
    }
    function claimTask(string _loaixe, string _biensoxe,string _hangmucbaohiem,uint _giatien) public {
                    taskCount ++;
                    tasks[taskCount] = Task(taskCount, _loaixe,_biensoxe,_hangmucbaohiem, false);
                    emit TaskClaim(taskCount, _content, false);
    }
 
   function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    
}