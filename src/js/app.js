App = {
 
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
  
  },

  loadAccount: async () => {
    // Set the current blockchain account
        if(web3.currentProvider.enable){
          //For metamask
          web3.currentProvider.enable().then(function(acc){
              App.account = account[8];
              $("#accountAddress").html("Your Account: " + App.account);
          });
          console.log(App.account)
      } else{
          App.account = web3.eth.accounts[0];
          $("#accountAddress").html("Your Account: " + App.account);
      }
  },

  loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const todoList = await $.getJSON('Election.json')
        // console.log(todoList)
        App.contracts.Election  = TruffleContract(todoList)
        App.contracts.Election.setProvider(App.web3Provider)
        console.log(Election)

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.Election.deployed()
        console.log(todoList)
  },

  render: async () => {
    // // Prevent double render
    if (App.loading) {
      return
    }

    // // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const carCount = await App.todoList.carCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= carCount; i++) {
      // Fetch the task data from the blockchain
      const car = await App.todoList.cars(i)
      const carId = car[0].toNumber()
      const loaixe = car[1]
      const biensoxe = car[2]
      const hangmucbaohiem= car[3]
      const giatien= car[4]
      

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(loaixe)
      $newTaskTemplate.find('input')
                      .prop('name', carId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // // Put the task in the correct list
      if (taskCompleted) {
        $('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  createTask: async () => {
    App.setLoading(true)
    const loaixe = $('#loaixe').val()
    console.log(loaixe)
    const biensoxe = $('#biensoxe').val()
    console.log(biensoxe)
    const hangmucbaohiem = $('#hangmucbaohiem').val()
    console.log(hangmucbaohiem)
    const giatien = $('#giatien').val()
    console.log(giatien)
    await App.todoList.addCar(loaixe)
    console.log(addCar)
    window.location.reload()
  },
  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.todoList.toggleCompleted(taskId)
    window.location.reload()
  },


  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.show()
    } else {
      loader.hide()
      content.show()
    }
 }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})