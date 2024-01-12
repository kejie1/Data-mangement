/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-12 11:50:47
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 13:32:17
 * @Description: 
 */
import { useEffect, useState } from 'react'
import { getErrorTypeAPI } from '@/apis'
import { TreeSelect } from 'antd'
const { SHOW_ALL } = TreeSelect;
const ErrorType: React.FC<{ onChange?: (value: Array<string>) => void }> = ({ onChange }) => {
    const [errorType, setErrorType] = useState([])
    const TreeSelectProps = {
        maxTagCount: 1,
        style: {
            width: 230,
        },
        popupMatchSelectWidth: false,
        treeCheckable: true,
        treeData: errorType,
        showCheckedStrategy: SHOW_ALL,
        placeholder: "清洗错误",
        onChange: (val) => { onChange(val) }
    }
    useEffect(() => {
        getErrorTypeAPI().then(res => {
            setErrorType(res.data.map(item => (
                {
                    title: item.label,
                    key: item.value,
                    value: item.value,
                    children: item.children.map(subItem => ({
                        title: subItem.label || item.label,
                        key: subItem.value,
                        value: subItem.value,
                    }))
                }
            )))
        })
    }, [])
    return (
        <TreeSelect {...TreeSelectProps} size='small' />
    )
}

export default ErrorType