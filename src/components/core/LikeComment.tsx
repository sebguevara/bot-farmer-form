"use client"

import { useMemo, useState } from "react";
import { GroupNumber } from "./form";
import { groups } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FieldRow, Helper } from "./Utils";
import { Input } from "../ui/input";
import { LikeCommentPayload, LikeCommentSinglePayload } from "@/app/types";
import { likeComment, likeCommentSingle } from "@/app/repositories/agent.repo";
import { toast } from "sonner";

export const LikeCommentForm = ({ isLoading, setLoading }: { isLoading: boolean, setLoading: (loading: boolean) => void }) => {
    const [modeSingle, setModeSingle] = useState(false);
    const [username, setUsername] = useState("");
    const [group, setGroup] = useState<GroupNumber>("1");
    const [posts, setPosts] = useState("");
    const [targets, setTargets] = useState("");
  
    const isDisabled = useMemo(() => {
      if (modeSingle) {
        return !username || posts.length === 0 || targets.length === 0;
      } else {
        return !group || posts.length === 0 || targets.length === 0;
      }
    }, [modeSingle, username, posts.length, targets.length, group]);

    const handleSubmit = async () => {
      if (modeSingle) {
        setLoading(true);
        if (!username || posts.length === 0 || targets.length === 0) return;
        const payload = { post_id: posts, comment_username: targets, username } as LikeCommentSinglePayload;
        try{
          const res = await likeCommentSingle(payload.post_id, payload.comment_username, payload.username);
          if (res.status === "success") {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Ocurrió un error al procesar la solicitud.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        if (!group || posts.length === 0 || targets.length === 0) return;
        const payload = { post_id: posts, group_id: group, comment_username: targets } as LikeCommentPayload;
        try{
          const res = await likeComment(payload.post_id, payload.group_id, payload.comment_username);
          if (res.status === "success") {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Ocurrió un error al procesar la solicitud.");
        } finally {
          setLoading(false);
        }
      }

      setUsername("");
      setGroup("1");
      setPosts("");
      setTargets("");
    }

  

    return (
      <Card className="rounded-2xl shadow-lg w-full min-w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5"/>Like a comentarios</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={modeSingle ? "outline" : "secondary"}>{modeSingle ? "Cuenta" : "Grupo"}</Badge>
              <Switch checked={modeSingle} onCheckedChange={setModeSingle} disabled={isLoading} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
  
          {modeSingle ? (
            <FieldRow>
              <div>
                <Label className="pb-2">Cuenta</Label>
                <Input className="border border-accent-foreground" disabled={isLoading} placeholder="@cuenta" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Helper text="Cuenta que dará like al comentario." />
              </div>
              <div>
                <Label className="pb-2">Usuario</Label>
                <Input className="border border-accent-foreground" disabled={isLoading} placeholder="autor" value={targets} onChange={(e) => setTargets(e.target.value)} />
                <Helper text="Autor del comentario." />
              </div>
            </FieldRow>
          ) : (
            <FieldRow>
              <div>
                <Label className="pb-2">Número de Grupo</Label>
                <Select disabled={isLoading} value={group} onValueChange={(v) => setGroup(v as GroupNumber)}>
                  <SelectTrigger className="border border-accent-foreground"><SelectValue placeholder="Elige grupo" /></SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Helper text="Grupo de cuentas (1..8)." />
              </div>
              <div>
                <Label className="pb-2">Usuario</Label>
                <Input className="border border-accent-foreground" disabled={isLoading} placeholder="autor" value={targets} onChange={(e) => setTargets(e.target.value)} />
                <Helper text="Autor del comentario." />
              </div>
            </FieldRow>
          )}
  
          <div>
            <Label className="pb-2">ID del Post</Label>
            <Input className="border border-accent-foreground" disabled={isLoading} placeholder="DJaJ14DtKqd" value={posts} onChange={(e) => setPosts(e.target.value)} />
            <Helper text="ID de la publicación." />
          </div>
  
          <div className="flex gap-2 w-full">
              <Button disabled={isLoading || isDisabled} aria-disabled={isLoading} className="w-full" onClick={handleSubmit}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Dar like"
              )}</Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  