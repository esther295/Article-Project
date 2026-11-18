import React from 'react';
import {
  Mail,
  FileText,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useApiData } from '../../context/useApiData';

interface CommentDetailsModalProps {
  commentId: number | null;
  onClose: () => void;
}

export const CommentDetailsModal: React.FC<CommentDetailsModalProps> = ({
  commentId,
  onClose,
}) => {
  const { comments, getPostById, getUserById, viewPostDetails, viewUserDetails } = useApiData();

  if (!commentId) return null;

  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return null;

  const parentPost = getPostById(comment.postId);
  const postAuthor = parentPost ? getUserById(parentPost.userId) : undefined;

  return (
    <Modal
      isOpen={Boolean(commentId)}
      onClose={onClose}
      title="Comment Inspection"
      subtitle={`Comment #${comment.id} • Attached to Post #${comment.postId}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Commenter Info & Subject Header */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-base shadow">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm capitalize">{comment.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-indigo-400 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${comment.email}`} className="hover:underline font-mono">
                    {comment.email}
                  </a>
                </div>
              </div>
            </div>
            <Badge variant="emerald" size="sm">
              <MessageSquare className="w-3 h-3" />
              Verified
            </Badge>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {comment.body}
          </div>
        </div>

        {/* Associated Parent Publication */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Associated Publication (Post #{comment.postId})
          </h4>

          {parentPost ? (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-slate-500 block mb-1">
                  POST #{parentPost.id}
                </span>
                <h5 className="text-sm font-semibold text-white capitalize truncate">
                  {parentPost.title}
                </h5>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {parentPost.body}
                </p>
                {postAuthor && (
                  <button
                    onClick={() => {
                      onClose();
                      viewUserDetails(postAuthor.id);
                    }}
                    className="text-[11px] text-indigo-400 hover:underline mt-1.5 inline-block"
                  >
                    Author: {postAuthor.name} ({postAuthor.company.name})
                  </button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  viewPostDetails(parentPost.id);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="shrink-0 text-xs border-indigo-500/30 text-indigo-300 hover:text-white"
              >
                Inspect Full Post
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-slate-850 rounded-lg text-xs text-slate-400">
              Post record #{comment.postId} not found.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
