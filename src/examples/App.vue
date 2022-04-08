<template>
    <div id="app">
      <router-view/>
        <!-- <el-form label-width="100px" :model="form">
            <el-form-item label="数据库类型">
                <el-input disabled v-model="form.DBType"></el-input>
            </el-form-item>
            <el-form-item label="数据库地址">
                <el-input v-model="form.host"></el-input>
            </el-form-item>
            <el-form-item label="端口号">
                <el-input v-model="form.port"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="数据库名称">
                <el-input v-model="form.dbNasme"></el-input>
            </el-form-item>
            <el-form-item label="数据库配置">
                <el-input v-model="form.config"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleSubmit" type="primary">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form> -->
    </div>
</template>

<script>
// import request from "./utils/request.js";
const request = {};
export default {
    name: "App",
    data() {
        return {
            form: {
                DBType: "mysql",
                host: "127.0.0.1",
                port: "3306",
                username: "root",
                password: "123456",
                dbNasme: "database",
                config: 'charset=utf8mb4&parseTime=True&loc=Local'
            },
        };
    },
    methods: {
        handleSubmit() {
            request({
                url: "/system/sql-config",
                method: "get",
                params: this.form,
            });
        },
    },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
    /* width: 400px;
    margin: 100px auto; */
}
</style>
