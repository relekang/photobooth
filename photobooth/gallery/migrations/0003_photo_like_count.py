# -*- coding: utf-8 -*-
# Generated by Django 1.9c1 on 2015-11-21 16:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0002_auto_20151121_1459'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='like_count',
            field=models.IntegerField(default=0),
        ),
    ]