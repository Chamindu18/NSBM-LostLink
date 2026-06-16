import { RequestHandler } from "express";

import { AuthRequest } from "../types/authRequest.types";

import {
  createNewClaim,
  fetchAllClaims,
  fetchClaimById,
  approveExistingClaim,
  rejectExistingClaim,
} from "../services/claim.service";

export const createClaim: RequestHandler = async (
  req,
  res
) => {
  try {
    const claim = await createNewClaim(
      req.body.message,
      (req as AuthRequest).user!.userId,
      req.body.itemId
    );

    res.status(201).json({
      success: true,
      message: "Claim created successfully",
      data: claim,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Claim creation failed",
    });
  }
};

export const getClaims: RequestHandler = async (
  req,
  res
) => {
  try {
    const claims = await fetchAllClaims();

    res.status(200).json({
      success: true,
      data: claims,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch claims",
    });
  }
};

export const getClaim: RequestHandler = async (
  req,
  res
) => {
  try {
    const claim = await fetchClaimById(
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Claim not found",
    });
  }
};

export const approveClaim: RequestHandler =
  async (req, res) => {
    try {
      const claim =
        await approveExistingClaim(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        message:
          "Claim approved successfully",
        data: claim,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Approval failed",
      });
    }
  };

export const rejectClaim: RequestHandler =
  async (req, res) => {
    try {
      const claim =
        await rejectExistingClaim(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        message:
          "Claim rejected successfully",
        data: claim,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Rejection failed",
      });
    }
  };