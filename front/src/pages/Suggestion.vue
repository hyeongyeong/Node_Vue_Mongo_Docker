<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <template slot="header">
          <h5 class="title">Tasks</h5>
          <p class="category">Backend development</p>
        </template>
        <l-table :data="tableData.data"
                  :columns="tableData.columns">
          <template slot="columns"></template>

          <template slot-scope="{row}">
            <td>
              <base-checkbox v-model="row.checked"></base-checkbox>
            </td>
            <td>{{row.title}}</td>
            <td class="td-actions text-right">
              <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                <i class="fa fa-edit"></i>
              </button>
              <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                <i class="fa fa-times"></i>
              </button>
            </td>
          </template>
        </l-table>
        <div class="footer">
          <hr>
          <div class="stats">
            <i class="fa fa-history"></i> Updated 3 minutes ago
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'

  export default {
    components: {
      LTable,
    },
    data () {
      return {
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        }
      }
    }
  }

</script>