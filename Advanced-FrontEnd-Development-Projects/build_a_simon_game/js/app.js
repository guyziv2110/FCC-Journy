  $(function () {
    var gm = new SimonManager(
        {
            simonStart: '#simon-start',
            simonReverseMode: '#simon-mode',
            simonModeLed: '#simon-mode-led',
            simonPowerSwitch: '#simon-power-switch',
            simonSwitchContainer: '.simon-switch-slot',
            simonCounter: '.simon-counter'
        }
    );
    
    gm.init();
  });