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
            ]
        }
    );
    
    gm.init();
  });