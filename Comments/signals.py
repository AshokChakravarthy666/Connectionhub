from typing import Type

from django.db.models.signals import post_save
from django.dispatch import receiver

from Comments.models import Comment
from Notifications.models import Notification


@receiver(post_save, sender=Comment)
def comment_created(sender: Type[Comment], instance: Comment, created: bool, **kwargs):
    if created:
        Notification.create_notification(
            recipient=instance.post.user,
            notification_type='comment',
            content=f'@{instance.user} commented on your post',
            arg_value=str(instance.post.id)
        )
