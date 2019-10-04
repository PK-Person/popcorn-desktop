<div class="windows-titlebar">  
  <nav class="btn-set fs-<%= process.platform %>">
      <button class="btn-os fullscreen tooltipped" data-toggle="tooltip" data-placement="<%= fsTooltipPos() %>" title="<%= i18n.__("Toggle Fullscreen") %>"></button>
  </nav>
  <h1 class="windows-titlebar-title">   
    <%= Settings.projectName %>
    <div class="events img-<%= events() %>">
  </h1>
  <div class="window-controls">
    <button class="window-control window-minimize">
      <div class="control-icon window-minimize-icon"></div>
    </button>
    <button class="window-control window-maximize">
      <div class="control-icon window-maximize-icon"></div>
    </button>
    <button class="window-control window-close">
      <div class="control-icon window-close-icon"></div>
    </button>
  </div>
</div>