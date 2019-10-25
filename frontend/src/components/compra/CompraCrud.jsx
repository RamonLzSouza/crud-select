import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'shopping-basket',
    title: 'Compras',
    subtitle: 'Compras'
}

const baseUrl = 'http://localhost:3001/compras'
const baseUrlUsers = 'http://localhost:3001/users'
const baseUrlProdutos = 'http://localhost:3001/produtos'


const initialState = {
    compra: { name_user: '', description_product: '', quantity: '', price: ''},
    list: [],
    listUsers: [],
    listProdutos: []
}

export default class CompraCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })

        axios(baseUrlUsers).then(resp => {
            this.setState({
                listUsers: resp.data,
                compra: {
                    ...this.state.compra,
                    name_user: resp.data[0].name
                }
            
            })
        })

        axios(baseUrlProdutos).then(resp => {
            this.setState({
                listProdutos: resp.data,
                compra: {
                    ...this.state.compra,
                    description_product: resp.data[0].description
                }
            })
        })
    }

    clear() {
        this.setState({ compra: initialState.compra })
    }

    save() {
        const compra = this.state.compra
        const method = compra.id ? 'put' : 'post'
        const url = compra.id ? `${baseUrl}/${compra.id}` : baseUrl
        axios[method](url, compra)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ compra: initialState.compra, list })
            })
    }

    getUpdatedList(compra, add = true) {
        const list = this.state.list.filter(u => u.id !== compra.id)
        if (add) list.unshift(compra) //Insere na primeira posiçao da lista
        return list
    }

    updateField(event) {
        const compra = { ...this.state.compra }
        compra[event.target.name] = event.target.value
        this.setState({ compra })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Usuário</label>
                            <select
                                className="form-control"
                                name="name_user"
                                value={this.state.compra.name_user}
                                onChange={e => this.updateField(e)}>
                                {
                                    this.state.listUsers.map(users => {
                                        return <option value={users.name}> {users.name} </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Produto</label>
                            <select
                                className="form-control"
                                name="description_product"
                                value={this.state.compra.description_product}
                                onChange={e => this.updateField(e)}>
                                {
                                    this.state.listProdutos.map(produtos => {
                                        return <option value={produtos.description}> {produtos.description} </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" className="form-control"
                                name="quantity"
                                value={this.state.compra.quantity}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="number" className="form-control"
                                name="price"
                                value={this.state.compra.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço..." />
                        </div>
                    </div>
                    
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(compra) {
        this.setState({ compra })
    }

    remove(compra) {
        axios.delete(`${baseUrl}/${compra.id}`).then(resp => {
            const list = this.getUpdatedList(compra, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Total</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(compra => {
            return (
                <tr key={compra.id}>
                    <td>{compra.name_user}</td>
                    <td>{compra.description_product}</td>
                    <td>{compra.quantity}</td>
                    <td>{compra.price}</td>
                    <td>{'R$ ' + (compra.quantity * compra.price)
                        .toFixed(2)
                        .replace('.', ',')}
                    </td>
                    
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(compra)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(compra)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}