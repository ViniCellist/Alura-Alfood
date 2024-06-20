import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import http from '../../../http';

import {Link as RouterLink} from 'react-router-dom';

const AdministracaoRestaurante = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    })

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete<IRestaurante>(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const ListaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...ListaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => 
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <RouterLink to={`${restaurante.id}`}>editar</RouterLink> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color='error' onClick={() => excluir(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        
    )
}

export default AdministracaoRestaurante;