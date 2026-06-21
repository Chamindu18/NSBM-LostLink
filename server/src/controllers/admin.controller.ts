import { RequestHandler } from "express";

import {
  fetchDashboardStats,
  fetchUsers,
  fetchItems,
  fetchClaims,
  removeUser,
  removeItem,
  removeClaim,
} from "../services/admin.service";

export const getDashboard: RequestHandler =
  async (req, res) => {
    try {
      const stats =
        await fetchDashboardStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard",
      });
    }
  };

export const getUsers: RequestHandler =
  async (req, res) => {
    try {
      const users = await fetchUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch users",
      });
    }
  };

export const getItemsAdmin: RequestHandler =
  async (req, res) => {
    try {
      const items = await fetchItems();

      res.status(200).json({
        success: true,
        data: items,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch items",
      });
    }
  };

export const getClaimsAdmin: RequestHandler =
  async (req, res) => {
    try {
      const claims = await fetchClaims();

      res.status(200).json({
        success: true,
        data: claims,
      });
    } catch {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch claims",
      });
    }
  };

export const deleteUser: RequestHandler =
  async (req, res) => {
    try {
      await removeUser(
        String(req.params.id)
      );

      res.status(200).json({
        success: true,
        message:
          "User deleted successfully",
      });
    } catch {
      res.status(400).json({
        success: false,
        message:
          "Failed to delete user",
      });
    }
  };

export const deleteItem: RequestHandler =
  async (req, res) => {
    try {
      await removeItem(
        String(req.params.id)
      );

      res.status(200).json({
        success: true,
        message:
          "Item deleted successfully",
      });
    } catch {
      res.status(400).json({
        success: false,
        message:
          "Failed to delete item",
      });
    }
  };

export const deleteClaim: RequestHandler =
  async (req, res) => {
    try {
      await removeClaim(
        String(req.params.id)
      );

      res.status(200).json({
        success: true,
        message:
          "Claim deleted successfully",
      });
    } catch {
      res.status(400).json({
        success: false,
        message:
          "Failed to delete claim",
      });
    }
  };