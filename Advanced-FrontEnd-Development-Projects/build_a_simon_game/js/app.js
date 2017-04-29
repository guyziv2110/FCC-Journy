  $(function () {
    var gm = new SimonManager(
        {
            simonStart: '#simon-start',
            simonReverseMode: '#simon-mode',
            simonPowerSwitch: '#simon-power-switch',
            simonSwitchContainer: '.simon-switch-slot',
            simonCounter: '.simon-counter'
        }
    );
    
    gm.init();
  });