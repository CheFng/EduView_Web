<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.year" placeholder="年份" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.aid" placeholder="资产类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in assetTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.rid" placeholder="地区类型" clearable style="width: 140px;padding-right: 10px;" class="filter-item">
        <el-option v-for="item in regionsOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.asId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年份" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.year }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域类型" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产类型" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.aname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.avalue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gmtCreate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gmtModified | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="200px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="center" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="资产类型" prop="aid">
          <el-select v-model="temp.aid" class="filter-item" placeholder="请选择资产类型">
            <el-option v-for="item in assetTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="year" style="width: 285px">
          <el-input v-model="temp.year" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="区域类型" prop="rid">
          <el-select v-model="temp.rid" class="filter-item" placeholder="请选择区域类型">
            <el-option v-for="item in regionsOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="avalue" style="width: 285px">
          <el-input v-model="temp.avalue" placeholder="请输入数量" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const assetTypeOptions = [
  { key: '1', display_name: '图书' },
  { key: '2', display_name: '计算机' },
  { key: '3', display_name: '教室' },
  { key: '4', display_name: '教室中:普通教室' }
]

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        year: '',
        rid: '',
        aid: ''
      },
      yearOptions: [2017, 2018, 2019, 2020],
      assetTypeOptions,
      regionsOptions: [
        { label: '总体', key: '1' },
        { label: '城市', key: '2' },
        { label: '县镇', key: '3' },
        { label: '乡村', key: '4' }
      ],
      showReviewer: false,
      temp: {
        asId: '',
        avalue: '',
        year: '',
        aid: '',
        rid: '',
        gmtCreate: new Date(),
        gmtModified: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        rid: [{ required: true, message: '请选择区域类型', trigger: 'change' }],
        year: [
          {
            required: true,
            message: '请输入有效年份',
            pattern: /^(19|20)\d{2}$/,
            trigger: 'blur'
          }
        ],
        aid: [{ required: true, message: '请选择资产类型', trigger: 'change' }],
        avalue: [
          {
            required: true,
            message: '请输入有效数字',
            pattern: /^[0-9]*$/,
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.records
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        asId: '',
        avalue: '',
        year: '',
        title: '',
        rid: '',
        aid: '',
        gmtCreate: new Date(),
        gmtModified: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.asId === this.temp.asId)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          'ID',
          '年份',
          '区域类型',
          '资产类型',
          '数量',
          '创建时间',
          '最后修改时间'
        ]
        const filterVal = [
          'asId',
          'year',
          'rname',
          'aname',
          'avalue',
          'gmtCreate',
          'gmtModified'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
