  $(function () {
    var gm = new SimonManager(
        {
            simonStart: '#simon-start',
            simonReverseMode: '#simon-mode',
            simonModeLed: '#simon-mode-led',
            simonPowerSwitch: '#simon-power-switch',
            simonSwitchContainer: '.simon-switch-slot',
            simonCounter: '.simon-counter',
            simonBoxes: [
              '#color-box-0',
              '#color-box-1',
              '#color-box-2',
              '#color-box-3',
            ],
            simonBoxesAudios: {
              '0': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
              '1': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
              '2': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
              '3': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
            }
        }
    );
    
    gm.init();
  });