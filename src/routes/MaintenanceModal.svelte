<!-- MaintenanceModal.svelte -->
<script>
      import { t } from "./i18nSetup";
</script>
{ #if $t}
    <div class="modal">
      <div class="modal-content">
        <h2>
            {$t("page.MaintenanceHeading", { default: "Server Maintenance" })}
        </h2>
        <p>
        {$t("page.MaintenanceText", { default: "The server is currently undergoing maintenance. Please try again later." })}
        </p>
      
      </div>
    </div>
  
    {/if}
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }
  
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
  
  </style>
  