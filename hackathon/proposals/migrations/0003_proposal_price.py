# Generated by Django 4.0.1 on 2022-01-23 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposals', '0002_proposal_address_proposal_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
    ]
