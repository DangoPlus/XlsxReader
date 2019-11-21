import React from 'react'
import {Button, Icon, message, Input} from 'antd'
import styles from './App.css'
import XLSX from 'xlsx'

export default class App extends React.Component {
  state = {}

  handleXLSX = file => {
    const {files} = file.target
    const reader = new FileReader()
    reader.onload = event => {
      try {
        const {result} = event.target
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, {type: 'binary'})
        let data = [] // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            break // 如果只取第一张表，就取消注释这行
          }
        }
        message.success('上传成功！')
        console.log(data)
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确！')
        return
      }
    }
    // 以二进制方式打开文件
    reader.readAsBinaryString(files[0])
  }

  render() {
    return (
      <div style={{marginTop: 100}}>
        <Button className={styles.uploadWrap}>
          <Icon type="upload" />
          <Input
            className={styles.fileUploader}
            type="file"
            accept=".xlsx, .xls"
            onChange={this.handleXLSX}
          />
          <span className={styles.uploadText}>上传文件</span>
        </Button>
        <p className={styles.uploadTip}>支持 .xlsx、.xls 格式的文件</p>
      </div>
    )
  }
}
