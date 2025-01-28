import { Request, Response } from 'express';
import * as roleService from '../services/roleService';

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.createRole(req.body);
    console.log('role', role)
    res.status(201).json(role);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Failed to create role' });
    }
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getRoles();
    console.log('roles', roles)
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update role' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete role' });
  }
};