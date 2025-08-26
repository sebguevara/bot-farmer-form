"use client"

import { Response } from "@/types/response.types";
import axios from "axios";

export const likePost = async (post_id: string, group_id: string): Promise<Response> => {
  try {
    const { data } = await axios.post('/api/like-post', { post_id, group_id })
    return {
      message: data.message ?? 'No message',
      status: data.status ?? 'error',
      current_time: data.current_time ?? 'No current time'
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}

export const likePostSingle = async (post_id: string, username: string): Promise<Response> => {
  try {
    const { data } = await axios.post('/api/like-post-single', { post_id, username })
    return {
      message: data.message ?? 'No message',
      status: data.status ?? 'error',
      current_time: data.current_time ?? 'No current time'
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}

export const commentPost = async (post_id: string, message: string, username: string): Promise<Response> => {
  try {
    const { data } = await axios.post('/api/comment-post', { post_id, message, username })
    return {
      message: data.message ?? 'No message',
      status: data.status ?? 'error',
      current_time: data.current_time ?? 'No current time'
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}

export const likeComment = async (post_id: string, group_id: string, comment_username: string): Promise<Response> => {
  try {
    const { data } = await axios.post('/api/like-comment', { post_id, group_id, comment_username })
    
    return {
      message: data.message ?? 'No message',
      status: data.status ?? 'error',
      current_time: data.current_time ?? 'No current time'
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}

export const likeCommentSingle = async (post_id: string, comment_username: string, username: string): Promise<Response> => {
  try {
    const { data } = await axios.post('/api/like-comment-single', { post_id, comment_username, username })
    return {
      message: data.message ?? 'No message',
      status: data.status ?? 'error',
      current_time: data.current_time ?? 'No current time'
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    throw error;
  }
}