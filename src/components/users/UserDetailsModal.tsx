import React from 'react';
import {
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  FileText,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useApiData } from '../../context/useApiData';

interface UserDetailsModalProps {
  userId: number | null;
  onClose: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const { getUserById, getPostsForUser, getCommentsForPost, viewPostDetails } = useApiData();

  if (!userId) return null;

  const user = getUserById(userId);
  if (!user) return null;

  const userPosts = getPostsForUser(user.id);

  return (
    <Modal
      isOpen={Boolean(userId)}
      onClose={onClose}
      title="User Profile & Publications"
      subtitle={`User ID #${user.id} • API Identity Record`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-indigo-950/30 border border-slate-700/80">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <Badge variant="indigo" size="sm">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-indigo-400 font-mono">@{user.username}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {user.company.name}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs">
            <Badge variant="purple" size="md">
              {userPosts.length} Published Posts
            </Badge>
            <span className="text-slate-400 font-mono text-[11px]">ID: {user.id}</span>
          </div>
        </div>

        {/* Contact & Company Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Contact Channels
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:text-indigo-300 hover:underline truncate"
                >
                  {user.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href={`tel:${user.phone}`}
                  className="hover:text-indigo-300 hover:underline truncate"
                >
                  {user.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-300 hover:underline truncate"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Company Affiliation
            </h4>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[11px]">Organization</span>
                <span className="font-semibold text-white">{user.company.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Catchphrase</span>
                <span className="text-slate-300 italic">&ldquo;{user.company.catchPhrase}&rdquo;</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Business Focus</span>
                <span className="text-indigo-300 font-mono text-[11px]">{user.company.bs}</span>
              </div>
            </div>
          </div>

          {/* Address & Geographic Coordinates */}
          <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>Location & Coordinates</span>
              <span className="text-slate-500 font-mono text-[10px] flex items-center gap-1">
                <Compass className="w-3 h-3 text-indigo-400" />
                {user.address.geo.lat}, {user.address.geo.lng}
              </span>
            </h4>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">
                  {user.address.suite}, {user.address.street}
                </p>
                <p className="text-slate-400">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Authored Articles ({userPosts.length})
            </h4>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {userPosts.map((post) => {
              const comments = getCommentsForPost(post.id);
              return (
                <div
                  key={post.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <h5
                      onClick={() => {
                        onClose();
                        viewPostDetails(post.id);
                      }}
                      className="text-xs font-semibold text-slate-200 hover:text-indigo-400 cursor-pointer capitalize transition-colors line-clamp-1"
                    >
                      {post.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {post.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="indigo" size="sm">
                      <MessageSquare className="w-3 h-3" />
                      {comments.length}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onClose();
                        viewPostDetails(post.id);
                      }}
                      className="text-xs py-1 px-2 text-slate-400 hover:text-white"
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
